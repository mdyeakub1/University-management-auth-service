import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AcademicSemesterService } from './academicSemester.service'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'
import sendReponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationField } from '../../../constans/pagination'
import { academicSemesterFilterableField } from './academicSemester.constant'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
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
  }
)

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableField)
  const paginationOptions = pick(req.query, paginationField)

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  )
  sendReponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSingleSemester(id)

  sendReponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrived successfully!',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicSemesterService.updateSemester(id, updatedData)

  sendReponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully!',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)

  sendReponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully!',
    data: result,
  })
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
