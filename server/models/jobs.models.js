import { Schema, model } from 'mongoose'

const jobsSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },
    logoUrl: {
        type: String,
        required: [true, 'Logo url is required'],
        match: [/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Enter valid url']
    },
    position: {
        type: String,
        required: [true, 'Job position is required']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: 1
    },
    jobType: {
        type: String,
        required: [true, 'Job type is required'],
        enum: ['parttime', 'fulltime']
    },
    place: {
        type: String,
        required: [true, 'Place is required'],
        enum: ['remote', 'office']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    about: {
        type: String,
        required: [true, 'About is required']
    },
    skills: [
        {
            type: String,
            required: true
        }
    ],
    information: {
        type: String,
        required: [true, ' Information is required']
    }
}, { timestamps: true })

const Job = model('Job', jobsSchema);

export default Job