import { createSlice } from '@reduxjs/toolkit'

const date = new Date()

const calenderSlice = createSlice({
  name: 'calender',
  initialState: {
    date,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    datesOfShifts: []
  },
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload
    },
    updateDay: (state, action) => {
      state.day = action.payload
    },
    updateMonth: (state, action) => {
      state.month = action.payload
    },
    updateYear: (state, action) => {
      state.year = action.payload
    },
    updateDatesOfShifts: (state, action) => {
      state.datesOfShifts = action.payload
    }

  },
})

export const {
  updateDay,
  updateMonth,
  updateYear,
  updateDatesOfShifts,
  updateDate

} = calenderSlice.actions

export const selectCalender = (state) => state.calender

export default calenderSlice.reducer
