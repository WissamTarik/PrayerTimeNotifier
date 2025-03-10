import React, { useContext } from 'react'
import { apiContext } from '../../context/ApiContextProvider'
import PrayerTimes from '../PrayerTimes/PrayerTimes'
import Footer from '../Footer/Footer'
import { Hourglass } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function AllPrayers() {
    const {prayers,currentPrayer,isLoading}=useContext(apiContext)
      if(isLoading){
        return <div className='loading'>
          <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['rgb(235, 158, 15)', 'rgb(125, 108, 0)']}
      />
        </div>
       }
  return (
    <div className="container">
      <Link to={'/'} className='all-prayers-link back-btn'>Back</Link>
          <div className='prayer-times'>
      {prayers.length>0 && Object.entries(prayers[0]).map(([key,value])=>{
        if(key !=='Sunset' && key!=='Sunrise'){
          
          return <PrayerTimes key={key} prayerName={key} prayerTime={value}  currentPrayer={currentPrayer}/>
        }
       
      })}
     </div>
     <Footer sunrise={prayers[0]?.Sunrise} sunset={prayers[0]?.Sunset} />
 
    </div>
  )
}
