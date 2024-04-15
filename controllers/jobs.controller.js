import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/jobs.model.js";

const jobsRegister = asyncHandler(
    async (req, res) => {

    // Get Data from Frontend 

    const { title, description, email, address, jobType, education, industry, experience, salary,
    position, company, lastDate } = req.body

    // Validate Data

    if(
        [title, description, email, address, jobType, education, industry, experience, salary,
        position, company, lastDate, ].some((field) => {
            return field?.trim() === ""
        })
    ){
        throw new ApiError(400, "Please fill all fields");
    }

    // Saving the Job into Database

    const job = await Job.create({
        title,
        description,
        email,
        address,
        jobType,
        education,
        industry,
        experience,
        salary,
        position,
        company,
        lastDate,
    })

    // Checking if the Job is created
    const createdJob = await Job.findById(job._id)

    if(!createdJob){
        throw new ApiError(500, "Something went wrong while Registering the Job");
    }

    // Return the Response

    return res.status(201).json(
        new ApiResponse(200, createdJob, "Job Registered Successfully")
    )

})

const jobById = asyncHandler(
    async (req, res) => {

        const { id } = req.params;

        const job = await Job.findById(id);

        if(job === null){
            throw new ApiError(404, "Job Not Found");
        }

        return res.status(201).json(
            new ApiResponse(200, job, "Job Fetched Successfully")
        )
    })

const jobDelete = asyncHandler(
    async (req, res) => {

        const { id } = req.params;
        const job = await Job.findById(id);

        if(job === null){
            throw new ApiError(404, "Job Not Found");
        }

        const deletedJob = await Job.findByIdAndDelete(id);

        return res.status(201).json(
            new ApiResponse(200, deletedJob, "Job Deleted Successfully")
        )

    }
)

const updateJob = asyncHandler(
    async (req, res) => {

        const { id } = req.params;

        const job = await Job.findById(id);

        if(job === null){
            throw new ApiError(404, "Job Not Found");
        }

        const { title, description, email, address, jobType, education, industry, experience, salary,
        position, company, lastDate } = req.body;

        if (title) job.title = title;
        if (description) job.description = description;
        if (email) job.email = email;
        if (address) job.address = address;
        if (jobType) job.jobType = jobType;
        if (education) job.education = education;
        if (industry) job.industry = industry;
        if (experience) job.experience = experience;
        if (salary) job.salary = salary;
        if (position) job.position = position;
        if (company) job.company = company;
        if (lastDate) job.lastDate = lastDate;

        await job.save();

        return res.status(201).json(
            new ApiResponse(200, job, "Job Updated Successfully"
        ))
})

const getStats = asyncHandler(
    async (req, res) => {
        const { searchTerm } = req.params;

        // Use regex to perform a case-insensitive search for jobs containing the search term
        const regex = new RegExp(searchTerm, 'i');

        const jobs = await Job.find({
            $or: [
                { title: regex },
                { description: regex },
                { company: regex },
                // Add more fields here if needed
            ]
        });

        // Calculate aggregate values
        const totalJobsFound = jobs.length;

        if(totalJobsFound === 0){
            return res.status(400).json(
                new ApiResponse(400, totalJobsFound, `No Stats Found for : ${searchTerm}`
            ))
        }

        const totalSalary = jobs.reduce((acc, job) => acc + (job.salary || 0), 0);
        const avgSalary = totalJobsFound > 0 ? totalSalary / totalJobsFound : 0;
        const minSalary = jobs.length > 0 ? Math.min(...jobs.map(job => job.salary || 0)) : 0;
        const maxSalary = jobs.length > 0 ? Math.max(...jobs.map(job => job.salary || 0)) : 0;

        const totalJobs = {
            totalJobsFound,
            totalSalary,
            avgSalary,
            minSalary,
            maxSalary 
        }

        return res.status(201).json(
            new ApiResponse(200, totalJobs, "Stats Fetched Successfully"
        ))
})



export { 
    jobsRegister, 
    jobDelete,
    jobById,
    updateJob,
    getStats
};