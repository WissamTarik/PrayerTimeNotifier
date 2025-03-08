import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { apiContext } from '../../context/ApiContextProvider'

export default function TopCard({first,currentPrayer,nextPrayer,endTime,nextPrayerTime}) {
const {currentPrayerEnd}=useContext(apiContext)  
  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm A'))
  const [currentPrayerEndFormat, setCurrentPrayerEndFormat] = useState(moment(currentPrayerEnd,'hh:mm').format('hh:mm A'))
  const [endTimeFormat, setEndTimeFormat] = useState(moment(endTime,'hh:mm').format('hh:mm A'))
  useEffect(()=>{
  const intervalId=  setInterval(() => {
       setCurrentTime(moment().format('hh:mm A'))
    }, 1000);
    return ()=>{
        clearInterval(intervalId)
    }
  },[])
  useEffect(() => {
    if (endTime) {
      setEndTimeFormat(moment(endTime, 'HH:mm').format('hh:mm A'));
    }
    if(currentPrayerEnd){
      setCurrentPrayerEndFormat(moment(currentPrayerEnd,'hh:mm').format('hh:mm A'))
    }
  }, [endTime,currentPrayerEnd]); 

  return (
    <div className='top-card'>

        {first?<div className="inner ">
           <h4>Now time is</h4>
           <h3>{currentPrayer}</h3>
           <h2>{currentTime} </h2>
           <div>
            <span>End time-</span>
            <strong>{endTimeFormat}  </strong>
           </div>
        </div>:<div className="inner ">
           <h4>Next time is</h4>
           <h3>{nextPrayer}</h3>
           <h2>{currentPrayerEndFormat} </h2>
           <div>
            <span>End time-</span>
            <strong>{endTimeFormat} </strong>
           </div>
        </div>}
    </div>
  )
}
