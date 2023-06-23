import express from 'express'
import { StudentController } from './student.controller'
const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)
router.patch('/:id', StudentController.updateStudent)
router.delete('/:id', StudentController.deleteStudent)
router.get('/', StudentController.getAllStudent)

export const StudentRoutes = router
