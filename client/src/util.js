const rateTable = {
  0: 2,
  1: 2.5,
  2: 3,
  3: 3.5,
  4: 4,
}

const fridayRate = 4

const addZero = (m) => {
  if (m < 10) {
    return `0${m}`
  }
  return m
}

const fromTimeStringToHours = (totalTime) => {
  if (totalTime === -1 || totalTime === 0) {
    return ''
  }
  let time = totalTime
  let [h, m] = time.split(':')

  let totalRelInHours = (parseInt(m) + parseInt(h) * 60) / 60
  return totalRelInHours
}

const nineHoursTimeInHours = 9
const baseRate = 30

const getBaseHours = (totalTime) => {
  let time = fromTimeStringToHours(totalTime)
  return time > nineHoursTimeInHours ? nineHoursTimeInHours : time
}

const get125RateHours = (totalTime) => {
  let time = fromTimeStringToHours(totalTime)
  return time > nineHoursTimeInHours ? time - nineHoursTimeInHours : 0
}

const calcWagePerBaseHours = (timeInHours) => {
  return timeInHours * baseRate
}

const calcWagePer125Hours = (timeInHours) => {
  return timeInHours * baseRate * 1.25
}

const getDiffInTimesStr = (startTime, endTime) => {
  let startArr = startTime.split(':')
  let endArr = endTime.split(':')
  let h = parseInt(endArr[0]) - parseInt(startArr[0])
  let m = parseInt(endArr[1]) - parseInt(startArr[1])
  if (h < 0) return -1
  if (h === 0 && m === 0) return 0
  if (h === 0 && m < 0) return -1


  let diffTimeStr, minutes
  if (m < 0) {
    minutes = addZero(60 + m)
    diffTimeStr = h - 1 + ':' + minutes
  } else {
    minutes = addZero(m)
    diffTimeStr = h + ':' + minutes
  }
  return diffTimeStr
}

const convertArrayToObjWithRates = (institutions) => {
  let testsRatesObj = {}
  institutions.forEach((inst) => {
    testsRatesObj[inst.rate] = inst.tests
  })
  return testsRatesObj
}

const createDayInfo = (
  totalTime,
  institutions,
  id_number,
  totalSumInstitutions,
  baseSalary
) => {
  let baseHours = getBaseHours(totalTime)
  let hoursPer125 = get125RateHours(totalTime)
  let baseWage = calcWagePerBaseHours(baseHours)
  let wageFor125 = calcWagePer125Hours(hoursPer125)
  // let testsRatesObj = convertArrayToObjWithRates(institutions)

  let dayInfo = {
    id_number,
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
    institutions,
    total: Number(fixNum(totalSumInstitutions + baseSalary)),
  }
  return dayInfo
}

const formatDate = (dateStr) => {
  let [year, month, thirdPart] = dateStr.split('-')
  let day = Number(thirdPart.split('T')[0])
  return `${day}/${month}/${year}`
}

const formatDate1 = (dateStr) => {
  let [year, month, thirdPart] = dateStr.split('-')
  let day = Number(thirdPart.split('T')[0])
  return `${month}/${day}/${year}`
}

const formatDateForMonth = (dateStr) => {
  let [year, month] = dateStr.split('-')
  return `${month}/${year}`
}

const fixNum = (num) => {
  return parseFloat(num).toFixed(2)
}

const fromLineToDot = (rate) => {
  return String(rate).replace('_', '.')
}

export default {
  fixNum,
  rateTable,
  fridayRate,
  fromTimeStringToHours,
  calcWagePerBaseHours,
  calcWagePer125Hours,
  get125RateHours,
  getBaseHours,
  getDiffInTimesStr,
  convertArrayToObjWithRates,
  createDayInfo,
  formatDate,
  fromLineToDot,
  formatDateForMonth,
  formatDate1,
}
