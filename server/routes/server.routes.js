import express from 'express'
import { checkServer } from '../controllers/server.controller.js'

const router = express.Router()

router.get("/health", checkServer)

export default router