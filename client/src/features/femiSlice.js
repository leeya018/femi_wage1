import { createSlice } from '@reduxjs/toolkit'
import api from '../api'
import util from '../util'

const femiSlice = createSlice({
  name: 'femi',
  initialState: {
    startTime: '',
    endTime: '',
    institutions: [],
    totalSumInstitutions: 0,
    totalTime: '0:00',
    baseSalary: 0,
    isFriday: false,
    monthlyIncome: {},
    showAddShift:false,
    allMyShifts: [],
    showModal: false,
    show1: false,

    salById: {},
  },
  reducers: {
    updateShow1:(state,action)=>{
      state.show1 = action.payload
    },
    updateShowAddShift:(state,action)=>{
      state.showAddShift = action.payload
    },
    resetFemiState: (state, action) => {
      state.startTime = ''
      state.endTime = ''
      state.institutions = []
      state.totalSumInstitutions = 0
      state.totalTime = '0:00'
      state.baseSalary = 0
      state.isFriday = false
      state.monthlyIncome = {}
      state.allMyShifts = []
      state.showModal = false
      state.salById = {}
    },

    updateSalaryById: (state, action) => {
      state.salById = action.payload
    },
    updateShowModal: (state, action) => {
      state.showModal = action.payload
    },
    updateAllMyShifts: (state, action) => {
      state.allMyShifts = action.payload
    },
    updateMonthlyIncome: (state, action) => {
      state.monthlyIncome = action.payload
    },
    addDayInfo: (state, action) => {
      let baseHours = util.getBaseHours(state.totalTime)
      let hoursPer125 = util.get125RateHours(state.totalTime)
      let baseWage = util.calcWagePerBaseHours(baseHours)
      let wageFor125 = util.calcWagePer125Hours(hoursPer125)

      let dayInfo = {
        id_number: localStorage.getItem('id_number'),
        hours: {
          baseHours: {
            amount: baseHours,
            baseWage,
          },
          hoursPer125: {
            amount: hoursPer125,
            wageFor125,
          },
        },
        institutions: state.institutions,
        total: util.fixNum(state.totalSumInstitutions + state.baseSalary),
      }

      api
        .saveDay(dayInfo)
        .then((res) => {
        })
        .catch((error) => {
        })
    },
    addInstitution: (state, action) => {
      let { institutionName, tests } = action.payload
      let ind = state.institutions.length
      if (ind > 4) {
        alert('cannot add more than 5 institutions')
        return
      }
      state.institutions = [
        ...state.institutions,
        {
          institutionName,
          tests: parseInt(tests),
          index: ind,
          rate: util.rateTable[ind],
          sum: util.rateTable[ind] * parseInt(tests),
        },
      ]
      state.institutionName = ''
      state.tests = 0
    },
    updateStartTime: (state, action) => {
      state.startTime = action.payload
    },
    updateEndTime: (state, action) => {
      state.endTime = action.payload
    },
    updateInstitutionName: (state, action) => {
      state.institutionName = action.payload
    },
    updateTests: (state, action) => {
      state.tests = action.payload
    },

    updateTotalSumInstitutions: (state, action) => {
      let sum = state.institutions.reduce((acc, institution) => {
        return institution.sum + acc
      }, 0)
      let institutionsTransportBonus =
        state.institutions.length > 0 ? (state.institutions.length - 1) * 40 : 0
      state.totalSumInstitutions = sum + institutionsTransportBonus
    },

    updateTotalTime: (state, action) => {
      let { startTime, endTime } = state
      let totalTimeStr = util.getDiffInTimesStr(startTime, endTime)
      state.totalTime = totalTimeStr
    },
    updateBaseSalary: (state, action) => {
      let baseHours = util.getBaseHours(state.totalTime)
      let hoursPer125 = util.get125RateHours(state.totalTime)
      let baseWage = util.calcWagePerBaseHours(baseHours)
      let WageFor125 = util.calcWagePer125Hours(hoursPer125)
      state.baseSalary = baseWage + WageFor125
    },
    toggleFriday: (state, action) => {
      state.isFriday = !state.isFriday
      state.institutions = state.institutions.map((inst, index) => {
        inst.sum = state.isFriday
          ? inst.tests * util.fridayRate
          : inst.tests * util.rateTable[inst.index]
        return inst
      })
    },
    updateTotalSumPerIns: (state, action) => {
      let { index, updatedSum } = action.payload
      state.institutions = state.institutions.map((inst) => {
        if (inst.index === index) {
          inst.sum = updatedSum
        }
        return inst
      })
    },
    updateAllInstitutionsRate: (state, action) => {
      // state.institutions = state.institutions.map((inst, index) => {
      //   inst.sum = state.isFriday
      //     ? inst.tests * util.fridayRate
      //     : inst.sum
      //   return inst
      // })
    },
    removeInstitution: (state, action) => {
      state.institutions = state.institutions.filter((inst) => {
        return inst.index !== action.payload
      })
    },

    getInstitution: (state, action) => {
      let item = state.institutions.find(
        (inst) => inst.index === action.payload
      )
      return item
    },
    updateInstitution: (state, action) => {
      let { index, institutionName, tests } = action.payload
      state.institutions = state.institutions.map((inst) => {
        if (inst.index === index) {
          inst.institutionName = institutionName
          inst.tests = tests
        }
        return inst
      })
    },
    resetFields: (state, action) => {
      state.institutionName = ''
      state.tests = ''
    },
    clearAllInstitutions: (state, action) => {
      state.institutions = []
    },
  },
})

export const {
  updateAllMyShifts,
  updateMonthlyIncome,
  addInstitution,
  addDayInfo,
  updateInst,
  clearAllInstitutions,
  updateInstitution,
  updateShow1,
  resetFields,
  resetFemiState,
  getInstitution,
  removeInstitution,
  updateShowModal,
  updateStartTime,
  updateEndTime,
  updateAllInstitutionsRate,
  updateInstitutionName,
  toggleFriday,
  updateBaseSalary,
  updateShowAddShift,
  updateTotalSumPerIns,
  updateTotalTime,
  updateTests,
  updateTotalSumInstitutions,
  updateSalaryById,
} = femiSlice.actions

export const selectFemi = (state) => state.femi

export default femiSlice.reducer
