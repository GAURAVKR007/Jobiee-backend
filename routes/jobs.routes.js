import { Router } from "express";

const router = Router()

import { 
    jobsRegister,
    jobDelete,
    jobById,
    updateJob,
    getStats
} from "../controllers/jobs.controller.js"

router.route("/register").post(jobsRegister)

router.route("/jobId/:id").get(jobById)

router.route("/deleteJob/:id").delete(jobDelete)

router.route("/updateJob/:id").put(updateJob)

router.route("/getStats/:searchTerm").get(getStats)

export default router