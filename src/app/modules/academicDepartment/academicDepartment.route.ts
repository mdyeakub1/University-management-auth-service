import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
const router = express.Router()

router.post(
  '/create-department',
  AcademicDepartmentController.createAcademicDepartment
)
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.patch('/:id', AcademicDepartmentController.updateAcademicDepartment)
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment)
router.get('/', AcademicDepartmentController.getAllAcademicDepartment)

export const DepartmentRoutes = router
