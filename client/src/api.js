import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// })

const api = axios.create({
  baseURL: '/api',
})

const createHeaders = (id_number, token) => {
  return {
    headers: {
      Authorization: token,
      id_number,
    },
  }
}

export const signup = (payload) => api.post(`/auth/signup`, payload)
export const login = (payload) => api.post(`/auth/login`, payload)
export const saveDay = (payload, id_number, token) =>
  api.post(`/addsalary`, payload, createHeaders(id_number, token))
export const getSalaryByMonth = (month, year, id_number, token) =>
  api.get(
    `/salarySumUp/?month=${month}&year=${year}`,
    createHeaders(id_number, token)
  )
export const getSalaryByID = (id, id_number, token) =>
  api.get(`/salary/${id}`, createHeaders(id_number, token))

export const getMyMonthlyShifts = (month, year, id_number, token) =>
  api.get(
    `/salarys/?month=${month}&year=${year}`,
    createHeaders(id_number, token)
  )

const apis = {
  signup,
  login,
  saveDay,
  getSalaryByID,
  getSalaryByMonth,
  getMyMonthlyShifts,
}

export default apis
