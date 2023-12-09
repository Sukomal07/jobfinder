import createError from '../utils/error.js'

export const checkServer = async (req, res, next) => {
    try {
        const currentDateAndTime = new Date();
        const formatedDateAndTime = currentDateAndTime.toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })

        res.status(200).json({
            success: true,
            server_name: "jobfinder",
            time: formatedDateAndTime,
            status: "active"
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}