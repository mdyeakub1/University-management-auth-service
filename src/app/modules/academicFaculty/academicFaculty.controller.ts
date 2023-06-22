import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendReponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import httpStatus from 'http-status'
import { AcademicFacultyService } from './academicFaculty.service'
import pick from '../../../shared/pick'
import { academicFacultyFilterableField } from './academicFaculty.constant'
import { paginationField } from '../../../constans/pagination'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body
    const result = await AcademicFacultyService.createAcademicFaculty(
      academicFacultyData
    )
    sendReponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created successfully!',
      data: result,
    })
  }
)

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableField)
    const paginationOptions = pick(req.query, paginationField)

    const result = await AcademicFacultyService.getAllFaculties(
      filters,
      paginationOptions
    )
    sendReponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty retrived successfully!',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await AcademicFacultyService.getSingleFaculty(id)
    sendReponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty retrive successfully!',
      data: result,
    })
  }
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updatedData
    )
    sendReponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty updated successfully!',
      data: result,
    })
  }
)

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await AcademicFacultyService.deleteAcademicFaculty(id)
    sendReponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty deleted successfully!',
      data: result,
    })
  }
)

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
