import React, { useEffect, useState } from 'react'
import "../../public/styles/Show.css"

export default function Show({ showData, day }) {
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("00:00")

  useEffect(() => {


    // Extract time from showData
    if (showData.start_time && showData.end_time) {
      const startHour = showData.start_time.split(' ')[1];  // Splits the datetime string and takes the time part
      const endHour = showData.end_time.split(' ')[1];    // Splits the datetime string and takes the time part

      setStartTime(startHour);  // Set start time
      setEndTime(endHour);      // Set end time
    }
  }, [day, showData.start_time, showData.end_time]); // Add dependencies on showData's times

  return (
    <div className='show'>
      <span className='band'>{showData.name}</span>  <br />
      <span className='hour'>{startTime} - {endTime}</span>
    </div>
  )
}