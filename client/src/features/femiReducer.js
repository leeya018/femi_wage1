

let initialState = {
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
}



export const updateShowAction = (isShow) => {
    return {
      type: "UPDATE_SHOW",
      payload: {show1:isShow}
    };
  };


export default function reducer(state=initialState,action){
    switch (action.type) {
        case "UPDATE_SHOW":
            return {...state ,...action.payload}
            
            break;
    
        default:
            return state
    }
}