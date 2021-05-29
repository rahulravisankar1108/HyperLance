const mongoose = require('mongoose');
const schema = mongoose.Schema;

const freelancerSchema = new schema({
    bio: {
        type:String,
        default:'',
    },
    jobTitle: {
        type:String,
        required:true,
    },
    skills: [{
        type:String,
        required:true,
    }],
    location:{
        type:String,
        required:true,
    },
    education: [{
        type:String,
        required:true,
    }],
    services : [{
        type:String,
        required:true,
    }],
    experience: {
        type:String,
        required:true,
    },
    postedBy: {
        type: schema.Types.ObjectId,
        ref:'users',
    },
    hourlyRate: {
        type: Number,
        default:0.00,
    },
    dailyRate: {
        type: Number,
        default:0.00,
    },
    postedAt: {
        type: Date,
        default:Date.now,
    },
        
});

module.exports = Freelancer = mongoose.model("freelancer", freelancerSchema);