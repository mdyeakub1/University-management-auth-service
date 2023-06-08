import express, { Application } from 'express'
import usersRoute from './app/modules/users/users.route'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/users/', usersRoute)

// global error handling
app.use(globalErrorHandler)

export default app
