import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import errorMiddleware from './middleware/error.middleware.js'
import serverRoutes from './routes/server.routes.js'

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", serverRoutes)
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Oops page not found"
    })
})

app.use(errorMiddleware)
export default app