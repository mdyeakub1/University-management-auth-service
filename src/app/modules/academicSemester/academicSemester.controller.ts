import { NextFunction, Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import { AcademicSemesterService } from './academicSemester.service'

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    )

    res.status(200).json({
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
}
