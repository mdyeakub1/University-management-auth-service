import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import { IAcademicFacultyFilters } from './academicFaculty.interface'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericPesponse } from '../../../interfaces/common'
import { academicFacultySearchableField } from './academicFaculty.constant'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createdFaculty = await AcademicFaculty.create(payload)
  if (!createdFaculty) {
    throw new ApiError(
      httpStatus.FAILED_DEPENDENCY,
      'Failed to create faculty!'
    )
  }
  return createdFaculty
}

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPesponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
