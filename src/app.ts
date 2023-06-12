import express, { Application } from 'express'
import { UserRouter } from './app/modules/users/user.route'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/users/', UserRouter)

// Api Testing
// app.get('/', async(req:Request, res:Response, next:NextFunction)=>{
// throw new Error('orebaba')
// })

// global error handling
app.use(globalErrorHandler)

export default app
