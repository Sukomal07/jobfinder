import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


export default app