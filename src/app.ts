import express, { Application } from 'express'
import usersRoute from './app/modules/users/users.route'
import cors from 'cors'
const app: Application = express()

app.use(cors())

// parsar
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/users/', usersRoute)

export default app
