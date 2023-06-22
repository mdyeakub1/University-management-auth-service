import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
)

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)

router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty)
router.get('/', AcademicFacultyController.getAllAcademicFaculties)

export const FacultyRoutes = router
