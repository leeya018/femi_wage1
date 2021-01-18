import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import savedIcon from '../images/savedIcon.png'
import "../styles/myCalender.css"

export default function MyCalendar() {
  const [value, setValue] = useState(new Date())

  const img = <img className="saved" src={savedIcon} alt="" />

  return (
    <div>
      <Calendar
        tileContent={img}
        // onClickDay={(value, e) => alert(value)}
        onChange={setValue}
        // onClickDay={()=>alert("this is open the modal to show the shift  ")}
        value={value}
      />
    </div>
  )
}
