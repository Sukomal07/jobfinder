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
export const editJob = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { jobId } = req.params;

        const { skills: skillsString, ...updateData } = req.body;

        const existingJob = await Job.findOne({ _id: jobId, createdBy: id });

        if (!existingJob) {
            return next(createError(400, 'No job found or you are not allowed'));
        }

        const skills = skillsString.split(',').map(skill => skill.trim());

        if (skills.length < 3) {
            return next(createError(400, 'At least 3 skills are required'));
        }

        const update = {
            skills,
            updateData
        }

        const updateJob = await Job.findByIdAndUpdate(
            jobId,
            { $set: update },
            { new: true }
        );

        try {
            await updateJob.validate();
        } catch (error) {
            const validationErrors = [];
            for (const key in error.errors) {
                validationErrors.push(`${key}: ${error.errors[key].message}`);
            }
            return next(createError(400, validationErrors.join(', ')));
        }

        await updateJob.save();

        res.status(201).json({
            success: true,
            message: 'Job updated successfully',
            updateJob
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const allJobs = await Job.find();

        res.status(200).json({
            success: true,
            jobs: allJobs,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
}

export const getJobsWithFilters = async (req, res, next) => {
    try {
        const { text, skills } = req.query;

        let filter = {};

        if (text) {
            filter = {
                $or: [
                    { companyName: { $regex: new RegExp(text, 'i') } },
                    { position: { $regex: new RegExp(text, 'i') } }
                ],
            };
        }

        if (skills) {
            const skillsArray = skills.split(',').map(skill => skill.trim());

            const skillRegexArray = skillsArray.map(skill => new RegExp(skill, 'i'));

            filter.skills = { $in: skillRegexArray };
        }

        const jobs = await Job.find(filter);

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No jobs found with the specified filters.'
            });
        }

        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
}

export const getJobById = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if (!job) {
            return next(createError(404, 'Job not found'))
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
}