import { IPaginationOptions } from '../interfaces/pagination'

// type IOptions = {
//     page: number | undefined,
//     limit: number | undefined,
//     sortBy: string | undefined,
//     sortOrder: string | undefined,
// }

type IOptionsResult = {
  page: number
  limit: number
  skip: number
}
const calculatePaginations = (options: IPaginationOptions): IOptionsResult => {
  const page = Number(options.page)
  const limit = Number(options.limit)
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
  }
}

export const paginationHelpers = {
  calculatePaginations,
}
