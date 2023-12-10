import express from 'express'
import { createJobs } from '../controllers/job.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post("/createjob", isLoggedIn, createJobs)

export default router