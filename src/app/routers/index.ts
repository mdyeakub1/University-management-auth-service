import express from 'express'
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { UserRoutes } from '../modules/users/user.route'
const router = express.Router()

const moduleRouter = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: SemesterRoutes,
  },
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router
