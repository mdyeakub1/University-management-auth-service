import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
)
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment)
router.get('/', AcademicDepartmentController.getAllAcademicDepartment)

export const DepartmentRoutes = router
