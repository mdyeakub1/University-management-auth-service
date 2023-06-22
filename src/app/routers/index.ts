import express from 'express'
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { UserRoutes } from '../modules/users/user.route'
import { FacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
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
  {
    path: '/academic-faculty',
    route: FacultyRoutes,
  },
  {
    path: '/academic-department',
    route: DepartmentRoutes,
  },
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router
