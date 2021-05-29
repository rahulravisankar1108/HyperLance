const express = require('express');
const router = express.Router();

const { check, validationResult } = require("express-validator/check");
const Freelancer = require('../models/Freelancer');
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

router.post('jobs/apply', auth, async(req, res) => {
    try {
        const apply
    } catch (err) {
        
    }
})
module.exports = router;