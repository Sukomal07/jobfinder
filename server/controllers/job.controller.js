import Job from '../models/jobs.models.js'
import createError from '../utils/error.js'

export const createJobs = async (req, res, next) => {
    try {
        const { id } = req.user
        const { companyName, logoUrl, position, salary, jobType, place, location, description, about, skills: skillsString, information } = req.body

        if (!companyName || !logoUrl || !position || !salary || !jobType || !place || !location || !description || !about || !skillsString || !information) {
            return next(createError(400, 'All input fields required'))
        }

        const skills = skillsString.split(',').map(skill => skill.trim());

        if (skills.length < 3) {
            return next(createError(400, 'At least 3 skills are required'));
        }

        const newJob = new Job({
            createdBy: id,
            companyName,
            logoUrl,
            position,
            salary,
            jobType,
            place,
            location,
            description,
            about,
            skills,
            information
        })

        try {
            await newJob.validate()
        } catch (error) {
            const validationErrors = [];
            for (const key in error.errors) {
                validationErrors.push(error.errors[key].message);
            }
            return next(createError(400, validationErrors.join(',')))
        }

        await newJob.save()

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            newJob
        })
    } catch (error) {
        return next(createError(error.message))
    }
}