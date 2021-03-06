const SalaryModel = require("./models/salary-model");
const isTodaySalaryInDb = async (id_number,date) => {
  var nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  let salary;
  try {
    salary = await SalaryModel.findOne({
      id_number,
      creationDate: {
        $gte: new Date(date.getFullYear(),date.getMonth(),date.getDate()),
        $lt: new Date(nextDay.getFullYear(),nextDay.getMonth(),nextDay.getDate()),
      },
    });

    if (salary) return true;
    return false;
  } catch (error) {
    throw error;
  }
};

const createInitialSumUpObj = (id_number) => {
  return {
    id_number,
    hours: {
      baseHours: {
        amount: 0,
        baseWage: 0,
      },
      hoursPer125: {
        amount: 0,
        wageFor125: 0,
      },
    },
    rates: {
      2: { amount: 0, wage: 0 },
      "2_5": { amount: 0, wage: 0 },
      3: { amount: 0, wage: 0 },
      "3_5": { amount: 0, wage: 0 },
      4: { amount: 0, wage: 0 },
    },
    totalWageByCategory: {
      base: 0,
      jumpsBetweenInstitutions: 0,
      tests: 0,
    },
    totalWage: 0,
  };
};

const fromDotToLine = (rate) => {
  return String(rate).replace(".", "_");
};

const sumUpMonth = (salaries, id_number) => {
  let sumup = createInitialSumUpObj(id_number);
  salaries.map((salary, index) => {
    sumup.hours.baseHours.amount += salary.hours.baseHours.amount;
    sumup.hours.baseHours.baseWage += salary.hours.baseHours.baseWage;
    sumup.hours.hoursPer125.amount += salary.hours.hoursPer125.amount;
    sumup.hours.hoursPer125.wageFor125 += salary.hours.hoursPer125.wageFor125;
    sumup.totalWageByCategory.jumpsBetweenInstitutions.amount +=
      salary.institutions.length - 1;
    sumup.totalWageByCategory.jumpsBetweenInstitutions =
      (salary.institutions.length - 1) * 40;
    salary.institutions.map((inst) => {
      let rate = fromDotToLine(inst.rate);
      sumup.rates[rate].amount += inst.tests;
      sumup.rates[rate].wage += inst.sum;
    });
  });
  for (const [keyRate, value] of Object.entries(sumup.rates)) {
    sumup.totalWageByCategory.tests += value.wage;
  }
  sumup.totalWageByCategory.base +=
    sumup.hours.baseHours.baseWage + sumup.hours.hoursPer125.wageFor125;

  sumup.totalWage =
    sumup.totalWageByCategory.base +
    sumup.totalWageByCategory.jumpsBetweenInstitutions +
    sumup.totalWageByCategory.tests;
  return sumup;
};
module.exports = {
  isTodaySalaryInDb,
  sumUpMonth,
};
