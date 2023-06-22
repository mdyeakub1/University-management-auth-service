import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { academicDepartmentSearchableField } from './academicDepartment.constant'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'
import { IGenericPesponse } from '../../../interfaces/common'

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const createdDepartment = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  if (!createdDepartment) {
    throw new ApiError(
      httpStatus.FAILED_DEPENDENCY,
      'Failed to create faculty!'
    )
  }
  return createdDepartment
}

const getAllAcademicDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPesponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableField.map(field => ({
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
  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty')
  return result
}

const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
