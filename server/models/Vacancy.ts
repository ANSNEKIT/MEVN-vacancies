import { model, Schema } from 'mongoose'

const vacancySchema = new Schema(
    {
        createdAt: {
            type: Date,
            required: true,
        },
        company: {
            name: {
                type: String,
                required: true,
            },
            prefix: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                default: '',
            },
        },
        name: {
            type: String,
            required: true,
        },
        cardImg: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        employmentType: {
            type: String,
            required: true,
        },
        hasRemote: {
            type: Boolean,
            default: false,
        },
        minPrice: {
            type: Number,
            default: 0,
        },
        maxPrice: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        dateEnd: {
            type: String,
            required: true,
        },
        timeEnd: {
            type: String,
            required: true,
        },
        dateTimeEnd: {
            type: Date,
            required: true,
        },
    },
    { versionKey: false },
)

export default model('Vacancy', vacancySchema)
