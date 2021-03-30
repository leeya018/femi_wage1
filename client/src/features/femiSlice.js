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
    allMyShifts: [],
    showAddShift:false,
    showBeforeModal: false,
    showConfirmedModal: false,
    showShiftModal: false,
    showMonthlySalaryModal: false,


    salById: {},
  },
  
  reducers: {
    updateShowMonthlySalaryModal:(state,action)=>{
      return {...state,showMonthlySalaryModal:action.payload}
    },
    updateShowShiftModal:(state,action)=>{
      return {...state,showShiftModal:action.payload}
    },
    updateShowConfirmedModal:(state,action)=>{
      return {...state,showConfirmedModal:action.payload}
    },
    updateShowAddShift:(state,action)=>{
      return {...state,showAddShift:action.payload}
    },
    updateShowBeforeModal: (state, action) => {
      return {...state,showBeforeModal:action.payload}
    },
    resetFemiState: (state, action) => {
      return {...state,
        startTime : '',
        endTime : '',
        institutions : [],
        totalSumInstitutions : 0,
        totalTime : '0:00',
        baseSalary : 0,
        isFriday : false,
        monthlyIncome : {},
        allMyShifts : [],
        showBeforeModal : false,
        salById : {}
      }
    },

    updateSalaryById: (state, action) => {
      return {...state,salById:action.payload}
    },

    updateAllMyShifts: (state, action) => {
      return {...state,allMyShifts:action.payload}
    },
    updateMonthlyIncome: (state, action) => {
      return {...state,monthlyIncome:action.payload}
    },
    // addDayInfo: (state, action) => {
    //   let baseHours = util.getBaseHours(state.totalTime)
    //   let hoursPer125 = util.get125RateHours(state.totalTime)
    //   let baseWage = util.calcWagePerBaseHours(baseHours)
    //   let wageFor125 = util.calcWagePer125Hours(hoursPer125)

    //   let dayInfo = {
    //     id_number: localStorage.getItem('id_number'),
    //     hours: {
    //       baseHours: {
    //         amount: baseHours,
    //         baseWage,
    //       },
    //       hoursPer125: {
    //         amount: hoursPer125,
    //         wageFor125,
    //       },
    //     },
    //     institutions: state.institutions,
    //     total: util.fixNum(state.totalSumInstitutions + state.baseSalary),
    //   }

    //   api
    //     .saveDay(dayInfo)
    //     .then((res) => {
         

    //     })
    //     .catch((error) => {
    //     })
    // },
    addInstitution: (state, action) => {
      let { institutionName, tests } = action.payload
      let ind = state.institutions.length
      if (ind > 4) {
        alert('cannot add more than 5 institutions')
        return
      }
      return {...state,
        institutionName:"",
        tests:0,
        institutions:[...state.institutions,
          {institutionName,tests:parseInt(tests),
            index:ind,rate:util.rateTable[ind ],
            sum:util.rateTable[ind]* parseInt(tests)}
          ]
    }
    },
    updateStartTime: (state, action) => {
      return {...state,startTime:action.payload}
    },
    updateEndTime: (state, action) => {
      return {...state,endTime:action.payload}
    },
    updateInstitutionName: (state, action) => {
      return {...state,institutionName:action.payload}
    },
    updateTests: (state, action) => {
      return {...state,tests:action.payload}
    },

    // this one is not changeing the state1 !!!!!!!!!!!! 
    updateTotalSumInstitutions: (state, action) => {
      let sum = state.institutions.reduce((acc, institution) => {
        return institution.sum + acc
      }, 0)
      let institutionsTransportBonus =
        state.institutions.length > 0 ? (state.institutions.length - 1) * 40 : 0
      return {...state,totalSumInstitutions:sum + institutionsTransportBonus}
    },

    updateTotalTime: (state, action) => {
      let { startTime, endTime } = state
      let totalTimeStr = util.getDiffInTimesStr(startTime, endTime)
      return {...state,totalTime:totalTimeStr}
    },
    updateBaseSalary: (state, action) => {
      let baseHours = util.getBaseHours(state.totalTime)
      let hoursPer125 = util.get125RateHours(state.totalTime)
      let baseWage = util.calcWagePerBaseHours(baseHours)
      let wageFor125 = util.calcWagePer125Hours(hoursPer125)
      return {...state,baseSalary:baseWage + wageFor125}
    },
    toggleFriday: (state, action) => {
     
      let isFriday = !state.isFriday
      let institutions = state.institutions.map((inst, index) => {
          inst.sum = state.isFriday
            ? inst.tests * util.fridayRate
            : inst.tests * util.rateTable[inst.index]
          return inst
        })
        return {...state,isFriday,institutions} 
    },
    updateTotalSumPerIns: (state, action) => {
      let { index, updatedSum } = action.payload

      let institutions = state.institutions.map((inst) => {
        if (inst.index === index) {
          inst.sum = updatedSum
        }
        return inst
      })
      return {...state,institutions}
    },

    removeInstitution: (state, action) => {
 
      let institutions = state.institutions.filter((inst) => {
          return inst.index !== action.payload
        })
        return {...state,institutions}
    },


    updateInstitution: (state, action) => {
      let { index, institutionName, tests } = action.payload
      let institutions = state.institutions.map((inst) => {
        if (inst.index === index) {
          inst.institutionName = institutionName
          inst.tests = tests
        }
        return inst
      })
      return {...state,institutions}
    },
    resetFields: (state, action) => {
      return {...state,institutionName:"",tests:""}
    },
    clearAllInstitutions: (state, action) => {
      return {...state,institutions:[]}
    },
  },
})

export const {
  updateAllMyShifts,
  updateMonthlyIncome,
  addInstitution,
  // addDayInfo,
  updateInst,
  clearAllInstitutions,
  updateInstitution,
  updateShowConfirmedModal,
  resetFields,
  resetFemiState,
  removeInstitution,
  updateBeforeConfirmModal,
  updateStartTime,
  updateEndTime,
  updateInstitutionName,
  toggleFriday,
  updateBaseSalary,
  updateShowAddShift,
  updateTotalSumPerIns,
  updateTotalTime,
  updateTests,
  updateTotalSumInstitutions,
  updateSalaryById,
  updateShowBeforeModal,
  updateShowMonthlySalaryModal,
  updateShowShiftModal
} = femiSlice.actions



export const selectFemi = (state) => state.femi

export default femiSlice.reducer
