// import React, { useEffect } from 'react'
// import api from '../api'

// import { useDispatch, useSelector } from 'react-redux'
// import { Form } from 'react-bootstrap'
// // import MyShiftModal from './MyShiftModal'
// import Shift from './Shift'

// import {
//   selectAddShiftForm,
//   updateAllMyShifts,
//   updateSalaryById,
// } from '../features/femiSlice'
// import { selectMessages, updateErrMessage } from '../features/messagesSlice'
// //make all rest calls to work with id_number adn token!!!

// let month = 1
// export default function MyShifts() {
//   let dispatch = useDispatch()
//   let addShiftForm= useSelector(selectAddShiftForm)
//   let messagesSelection = useSelector(selectMessages)

//   const getMyMonthlyShifts = (chosenMonth) => {
//     let id_number = localStorage.getItem('id_number')
//     let token = localStorage.getItem('token')
//     month = chosenMonth

//     api
//       .getMyMonthlyShifts(month - 1, id_number, token)
//       .then((res) => {
//         dispatch(updateErrMessage(''))
//         dispatch(updateAllMyShifts(res.data))
//       })
//       .catch((err) => {
//         if (err.response) {
//           dispatch(updateErrMessage(err.response.data.message))
//         } else {
//           dispatch(updateErrMessage(err.message))
//         }
//       })
//   }

//   useEffect(() => {


//     getMyMonthlyShifts(1)
//   }, [])

//   const updateSal = (sal) => {
//     dispatch(updateSalaryById(sal))
//   }
//   return (
//     <div>

//       <div>
//         <Form>
//           <Form.Group controlId="exampleForm.SelectCustomSizeSm">
//             <Form.Control
//               custom
//               onChange={(e) => getMyMonthlyShifts(e.target.value)}
//               as="select"
//               size="lg"
//             >
//               <option value={1}>ינואר-1</option>
//               <option value={2}>פברואר-2</option>
//               <option value={3}>מרץ-3</option>
//               <option value={4}>אפריל-4</option>
//               <option value={5}>מאי-5</option>
//               <option value={6}>יוני-6</option>
//               <option value={7}>יולי-7</option>
//               <option value={8}>אוגוסט-8</option>
//               <option value={9}>ספטמבר-9</option>
//               <option value={10}>אוקטובר-10</option>
//               <option value={11}>נובמבר-11</option>
//               <option value={12}>דצמבר-12</option>
//             </Form.Control>
//           </Form.Group>
//         </Form>
//         {/* <button onClick={getMyMonthlyShifts}>get salary</button> */}
//       </div>
//       {messagesSelection.errMessage ? (
//         <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
//       ) : (
//         <div>
//           {addShiftForm.allMyShifts.length > 0 && (
//             <ul>
//               <h2>{`${month}/${new Date().getFullYear()}`}</h2>
//               {addShiftForm.allMyShifts.map((shift, ind) => (
//                 <Shift updateSal={updateSal} key={ind} {...shift} />
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }
