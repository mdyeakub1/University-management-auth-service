import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface'

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autum',
  'Summer',
  'Fall',
]
export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autum: '01',
  Summer: '02',
  Fall: '03',
}

export const academicSemesterFilterableField = [
  'searchTerm',
  'title',
  'code',
  'year',
]
export const academicSemesterSearchableField = ['title', 'code', 'year']
