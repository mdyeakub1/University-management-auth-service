import httpStatus from 'http-status'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericPesponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Summer  02 !=== 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericPesponse<IAcademicSemester[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePaginations(paginationOptions)

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit)

  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
}
