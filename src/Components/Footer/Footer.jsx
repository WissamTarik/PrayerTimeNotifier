import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function Footer({sunrise,sunset}) {
    const [sunsetPmOrAm, setSunsetPmOrAm] = useState(moment(sunset,"hh:mm").format('A'))
  const [sunrisePmOrAm, setSunrisePmOrAm] = useState(moment(sunrise,"hh:mm").format('hh:mm A'))
  useEffect(() => {
    if(sunrise){
        setSunrisePmOrAm(moment(sunrise,"hh:mm").format('hh:mm A'))
    }
    if(sunset){
        setSunsetPmOrAm(moment(sunset,"hh:mm").format('A'))
    }
  }, [sunrise,sunset])
  
  return (
    <div className='footer'>
        <div className="container">
            <div>
                <h2>Sunrise</h2>
                <h5> {sunrisePmOrAm} </h5>
            </div>
            <div>
                <h2>Sunset</h2>
                <h5>{sunset} {sunsetPmOrAm}</h5>
            </div>
        </div>
    </div>
  )
}
