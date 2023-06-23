import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...studentData } = req.body
    const result = await UserService.createStudent(student, studentData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student created successfully!',
      data: result,
    })
  }
)

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...facultyData } = req.body
  const result = await UserService.createFaculty(faculty, facultyData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body
  const result = await UserService.createAdmin(admin, userData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  })
})

//test
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
}
