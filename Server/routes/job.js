const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

const Job = require('../models/Job');
const auth = require('../middleware/auth');
const Freelancer = require('../models/Freelancer');


router.post('/add', auth, [
    check("category", "Category is required")
      .not()
      .isEmpty(),
    check("description", "Description is required ")
      .not()
      .isEmpty(),
    check("country", "Country is required")
      .not()
      .isEmpty(),
    check("budget", "Budget is required")
      .not()
      .isEmpty(),
    check("period", "Period is required")
      .not()
      .isEmpty()
  ], async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    try{
        const {category, description, country,
        budget, period} = req.body;
        const newJob = new Job({
            postedBy: req.user._id,
            category : category,
            description : description,
            country : country,
            budget : budget,
            period : period,
            name: req.user.name,
            email: req.user.email,
        });

        await newJob.save();

        res.status(200).json({
            message : "Job Added!",
            res : true,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message : `Job Add Error! ${err}`,
            res : false,
        });
    }
});

router.get('/viewAll',auth, async(req,res) => {
    try {
        const getAllJobs = await Job.find().populate('postedBy', 'name email');
        if(getAllJobs){
            res.status(200).json({
                allJobs : getAllJobs,
                res:true,
            });
        }
        else {
            res.status(201).json({
                allJobs : null,
                res:false,
            });
        }
    } catch (err) {
        res.status(500).json({
            allJobs : null,
            res:false,
        });
    }
});

router.get('/myView',auth, async(req,res) => {
    try {
        const getJobs = await Job.find({postedBy:req.user._id}).populate('postedBy', 'name email');
        if(getJobs){
            res.status(200).json({
                Jobs : getJobs,
                res:true,
            });
        }
        else {
            res.status(201).json({
                Jobs : null,
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

router.get('/:jobId',auth, async(req,res) => {
    try {
        const getJob = await Job.findById(req.params.jobId);
        if(getJob){
            res.status(200).json({
                Jobs : getJob,
                res:true,
            });
        }
        else {
            res.status(201).json({
                Job : null,
                res:false,
            });
        }
    } catch (err) {
        res.status(500).json({
            Job : null,
            res:false,
        });
    }
});

router.post('/viewApplied/:jobId', auth, async(req,res) => {
    try {
        const viewApplied = await Job.findById(req.params.jobId, {Applied:1}).populate('applied', 'name email');
        if(viewApplied) {
            return res.status(200).json({
                res:true,
                appliedUsers : viewApplied,
            });
        }
        return res.status(201).json({
            res:false,
            appliedUsers : null,
        });
    } catch (err) {
        return res.status(200).json({
            res:false,
            appliedUsers : `${err}`,
        });
    }
})
router.post('/select', auth, async(req,res) => {
    const {userId, jobId } =req.body;
    try {
        const freelancer = await Freelancer.findById(userId);
        const job = await Job.findById(jobId);
        const selectFreelancer = await Job.findById(jobId, {"$push" : { selected : userId}}, {new:true, safe : true});
        const notifyFreelancer = await Freelancer.findById(userId, {"$pull" : {appliedJobs : jobId}}, {new:true, safe : true});
        const selectedFreelancer = await Freelancer.findById(userId, {"$push" : {selectedJobs : JobId}}, {new:true, safe : true})
        const otherFreelancer = await Job.findById(jobId).populate('applied',"_id name email");
        otherFreelancer.map((user) => {
            Freelancer.findByIdAndUpdate(user._id, {"$push" : {notification: `Candidate ${freelancer.name} has been selected for the post that you have applied for ${job.description}`}});
        });
        const closeJob = await Job.findByIdAndUpdate(jobId, {$set : { isAvailable : false}}, {new:true, safe: true});
        console.log(closeJob, selectFreelancer, selectedFreelancer, otherFreelancer);
        if(otherFreelancer && selectFreelancer && notifyFreelancer && selectedFreelancer) {
            return res.status(200).json({
                res:true,
                Job : closeJob,
            });
        }
        return res.status(404).json({
            res:false,
        });
    } catch (err) {
        return res.status(500).json({
            res:false,
            Error : `${err}`,
        });
    }
})

module.exports = router;
