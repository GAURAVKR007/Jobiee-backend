import mongoose from "mongoose";

const jobTypeChoices= ['Permanent','Temporary','Internship']
const educationTypeChoices= ['Bachelors','Masters','PHD']
const industryTypeChoices= ['Bussiness','Information Technology','Banking','Education','Telecommunication','Healthcare','Others']
const experienceTypeChoices= ['No Experience','1 Years','2 Years','3 Years Above']

function returnDateTime() {
    const now = new Date();
    const tenDaysLater = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
    return tenDaysLater;
}

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: true
    },
    jobType: {
        type: String,
        enum: jobTypeChoices,
        default: 'Permanent'
    },
    education: {
        type: String,
        enum: educationTypeChoices,
        default: 'Bachelors'
    },
    industry: {
        type: String,
        enum: industryTypeChoices,
        default: 'Bussiness'
    },
    experience: {
        type: String,
        enum: experienceTypeChoices,
        default: 'No Experience'
    },
    salary: {
        type: Number,
        min: 10000,
        max: 1000000
    },
    position: {
        type: Number,
        default: 1,
    },
    company: {
        type: String,
        maxlength: 100,
        required: false,
    },
    lastDate: {
        type: Date,
        default: returnDateTime
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Job = mongoose.model("Job", jobSchema)