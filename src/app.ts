import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routers'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/', router)

// Api Testing
// app.get('/', async(req, res)=>{
// throw new Error('orebaba')
// })

// global error handling
app.use(globalErrorHandler)

export default app
