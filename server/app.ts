import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import vacancyRoutes from './routes/'


dotenv.config()
const app = express()

app.use(cors())
app.use(morgan(process.env.LOG_LEVEL ?? 'dev'))
app.use(express.json())

app.use('/api', vacancyRoutes)

export default app
