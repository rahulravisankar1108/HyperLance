const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Job = require('../models/Job');
const auth = require('../middleware/auth');
const { compareSync } = require('bcryptjs');
// const jobValidator = require('')

router.post('/add', auth, async(req,res) => {
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
        const getAllJobs = await Job.find();
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
        const getJobs = await Job.find({postedBy:req.user._id});
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


module.exports = router;
