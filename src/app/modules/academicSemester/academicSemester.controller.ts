import { NextFunction, Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import { AcademicSemesterService } from './academicSemester.service'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'
import sendReponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationField } from '../../../constans/pagination'

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    )
    sendReponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    })
    next()
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationField)
    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    )
    sendReponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester retrived successfully!',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
}
