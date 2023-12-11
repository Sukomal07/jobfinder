import express from 'express'
import { createJobs, editJob, getAllJobs, getJobById, getJobsWithFilters } from '../controllers/job.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post("/createjob", isLoggedIn, createJobs)
router.put("/:jobId/editjob", isLoggedIn, editJob)
router.get("/alljobs", getAllJobs)
router.get("/jobs", getJobsWithFilters)
router.get("/:jobId/viewjob", getJobById)

export default router