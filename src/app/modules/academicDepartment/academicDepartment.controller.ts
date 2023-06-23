import httpStatus from 'http-status'
import { IAcademicDepartment } from './academicDepartment.interface'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import pick from '../../../shared/pick'
import { academicFacultyFilterableField } from '../academicFaculty/academicFaculty.constant'
import { paginationField } from '../../../constans/pagination'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body
    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicDepartmentData
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department created successfully!',
      data: result,
    })
  }
)

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableField)
    const paginationOptions = pick(req.query, paginationField)

    const result = await AcademicDepartmentService.getAllAcademicDepartment(
      filters,
      paginationOptions
    )

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department retrived successfully!',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await AcademicDepartmentService.getSingleAcademicDepartment(
      id
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department retrive successfully!',
      data: result,
    })
  }
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedDate = req.body

    const result = await AcademicDepartmentService.updateAcademicDepartment(
      id,
      updatedDate
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department update successfully!',
      data: result,
    })
  }
)

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await AcademicDepartmentService.deleteAcademicDepartment(id)
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department delete successfully!',
      data: result,
    })
  }
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
