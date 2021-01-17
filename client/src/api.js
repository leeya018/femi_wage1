import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// })

const api = axios.create({
  baseURL: '/api',
})

const createHeaders = (username, token) => {
  return {
    headers: {
      Authorization: token,
      username,
    },
  }
}

export const signup = (payload) => api.post(`/auth/signup`, payload)
export const login = (payload) => api.post(`/auth/login`, payload)
export const saveDay = (payload, username, token) =>
  api.post(`/addsalary`, payload, createHeaders(username, token))
export const getSalaryByMonth = (month, username, token) =>
  api.get(`/salarySumUp/?month=${month}`, createHeaders(username, token))
export const getSalaryByID = (id, username, token) =>
  api.get(`/salary/${id}`, createHeaders(username, token))

export const getMyMonthlyShifts = (month, username, token) =>
  api.get(`/salarys/?month=${month}`, createHeaders(username, token))

const apis = {
  signup,
  login,
  saveDay,
  getSalaryByID,
  getSalaryByMonth,
  getMyMonthlyShifts,
}

export default apis
