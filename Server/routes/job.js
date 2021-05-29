const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

const Job = require('../models/Job');
const auth = require('../middleware/auth');


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

router.post('/select', auth, async(req,res) => {
    try {
        
    } catch (err) {
        
    }
})

module.exports = router;
