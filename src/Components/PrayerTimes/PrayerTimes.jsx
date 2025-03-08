import moment from 'moment'
import React, { useState } from 'react'

export default function PrayerTimes({prayerName,prayerTime,currentPrayer}) {
  const [prayerTimeFormat, setprayerTimeFormat] = useState(moment(prayerTime,'hh:mm').format('hh:mm A'))
  return (
    <div className='prayer'>
        <div>
        {prayerName=='Fajr'|| prayerName =="Isha"?<i className={`fa-solid fa-moon ${currentPrayer==prayerName?"active":''}`}></i>:<i className={`fa-solid fa-sun ${currentPrayer==prayerName?"active":''}`}></i>}    
         <span className={`${currentPrayer==prayerName?"active":''}`}>{prayerName}</span>
             
            </div>
            <div>
                <span> {prayerTimeFormat} </span>
                <i className='fas fa-bell'></i>
            </div>
    </div>
  )
}
