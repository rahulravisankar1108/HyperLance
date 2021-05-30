const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require("express-validator/check");
const Freelancer = require('../models/Freelancer');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

router.post(
    "/profile/add",
    [
      auth,
      [
        check("jobTitle", "job title is required").not().isEmpty(),
        check("skills", "Skills is required").not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        bio,
        jobTitle,
        skills,
        location,
        education,
        services,
        experience,
        hourlyRate,
        dailyRate,
      } = req.body;
      // Build profile object
      const profileFields = {};
      if (bio) profileFields.bio = bio;
      if (jobTitle) profileFields.jobTitle = jobTitle;
      if (skills) {
        profileFields.skills = String(skills)
          .split(",")
          .map((skill) => skill.trim());
      }
      if (location) profileFields.location = location;
      if(education) {
        profileFields.education = String(education)
          .split(",")
          .map((course) => course.trim());
      }
      if(services)  {
        profileFields.services = String(services)
          .split(",")
          .map((eachService) => eachService.trim());
      }
      if(experience) profileFields.experience = experience;
      profileFields.postedBy = req.user.id;
      if (hourlyRate) profileFields.hourlyRate = hourlyRate;
      if (dailyRate) profileFields.dailyRate = dailyRate;
      
      console.log(profileFields.service);
      // Build social object
      try {
        let profile = await Freelancer.findOne({ postedBy: req.user._id });
        if (profile) {
          // update
          profile = await Freelancer.findOneAndUpdate(
            { postedBy: req.user.id },
            { $set: profileFields },
            { new: true, safe:true }
          );
          console.log(profile);
          return res.json(profile);
        }
        // Create
        
        profile = new Freelancer(profileFields);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    }
);
router.get('/profile',auth, async (req, res) => {
    try {
        const userProfile = await Freelancer.findOne({postedBy:req.user._id});
        if(userProfile) {
            return res.status(200).json({
                userProfile : userProfile,
            });
        }
        return res.status(404).json({
            message:'No user found!'
        });
    } catch (err) {
        return res.status(500).json({
            message: `Error : ${err}`,
        });
    }
})

router.get('/viewAllProfile',auth, async (req, res) => {
    try {
        const usersProfile = await Freelancer.find();
        if(usersProfile) {
            return res.status(200).json({
                usersProfile : usersProfile,
            });
        }
        return res.status(404).json({
            message:'No user found!'
        });
    } catch (err) {
        return res.status(500).json({
            message: `Error : ${err}`,
        });
    }
});

router.get('/viewAppliedJobs',auth, async(req,res) => {
  try {
      console.log(req.user._id);
      const appliedJobs = await Freelancer.findOne({postedBy:req.user._id}).populate('appliedJobs', 'category description country budget period name email');

      console.log(appliedJobs);
      if(appliedJobs){
          res.status(200).json({
              appliedJobs : appliedJobs,
              res:true,
          });
      }
      else {
          res.status(201).json({
            appliedJobs : null,
              res:false,
          });
      }
  } catch (err) {
      res.status(500).json({
          Jobs : null,
          res:false,
      });
  }
});

router.post('/jobs/apply/:jobId', auth, async(req, res) => {
    try {
        const { jobId } = req.params;
        const applyJob = await Freelancer.updateOne({postedBy:req.user._id}, {"$push" : {appliedJobs:jobId}}, {new:true, safe:true});
        const notifyRecruiter = await Job.findByIdAndUpdate(jobId, {"$push" : { applied: req.user._id }} , {new:true, safe:true});
        console.log(notifyRecruiter);
        
        if(applyJob && notifyRecruiter) {
            return res.status(200).json({
                res:true,
                message:"Applied!",
            });
        }
        return res.status(404).json({
            res:false,
            message:`No user found!`,
        });
    } catch (err) {
        return res.status(500).json({
            res:false,
            message:`Check your query ${err}`,
        });
    }
});


module.exports = router;