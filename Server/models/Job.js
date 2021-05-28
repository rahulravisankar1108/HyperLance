const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    category : {
        type : String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required:true,
    },
    budget: {
        type: Number,
        required:true,
    },
    period: {
        type: String,
        required:true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
    applied : [{
        type:Schema.Types.ObjectId,
        ref:'users',
    }],
    selected: {
        type:Schema.Types.ObjectId,
        ref:'users',
    },
});

module.exports = Job = mongoose.model("jobs", JobSchema);