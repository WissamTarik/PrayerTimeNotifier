import React, { useContext, useEffect, useState } from 'react'
import TopCard from '../TopCard/TopCard'
import PrayerTimes from '../PrayerTimes/PrayerTimes'
import { apiContext } from '../../context/ApiContextProvider'
import moment from 'moment'
import { Hourglass } from 'react-loader-spinner'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
  const [selectValue, setSelectValue] = useState('cairo')
  
  const {getData,myData,isLoading,prayers,checkNextAndCurrentPrayer,setPrayers,nextPrayer,currentPrayer,currentPrayerEnd,nextPrayerEnd,remainingTime}=useContext(apiContext)
  
  function handleSelectChange(value){
 
 setSelectValue(value)
 setPrayers([]);
 getData(value);

  }
 function getNotification(){
 
   if(Notification.permission=='default'){
    Notification.requestPermission().then((permission)=>{
      if(permission=='granted'){
        new Notification('You will get notification at prayer time',{
          body:"Don't miss your prayer",
          icon:'../../../public/icon.jpg'
        })
      }
      else{
        alert("Notifications are blocked")
      }
    })
  }
  else{
    alert("You can't get notifications")
  }
 }
 function showPrayerNotification(prayerName){
    if(Notification.permission=='granted'){
      new Notification(`Time for ${prayerName}` ,{
        body:"Don't forget to pray"
      })
    }
 }
  
  useEffect(() => {
    if(myData==null){
        getData('cairo')
    }
 
   
  }, []); 
 
   useEffect(() => {
     
    if (prayers.length > 0) {
      checkNextAndCurrentPrayer(prayers);
    }
    function checkPrayerNotifcation(){
      if (Notification.permission !== 'granted') return; 

       const currentTime=moment().format('HH:MM')
       const result = Object.entries(prayers[0]).find(([, prayerTime]) => prayerTime === currentTime);

     if(result){
      showPrayerNotification(result[0])
    }
    }
    const intervalId= setInterval(() => {
       checkPrayerNotifcation()
     }, 30000);
     return ()=>{
      clearInterval(intervalId)
     }
   }, [prayers])
   
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
    <>
    <main>
  <div className="container">
    <div className="buttons-container">
    <button onClick={getNotification}>Allow   Notification</button>
    <Link to={'/allPrayers'} className='all-prayers-link'>See prayer times</Link>
    </div>

  <div className="location">
    <div className='location-icon'>
    <span><i className="fa-solid fa-location-dot"></i></span>
    <h2>{selectValue.charAt(0).toUpperCase() + selectValue.slice(1)}</h2>
    </div>
    <select onChange={(e)=>handleSelectChange(e.target.value)}>
  <option selected={selectValue=='cairo'?true:false} value="cairo">Cairo</option>
  <option selected={selectValue=='giza'?true:false} value="giza">Giza</option>
  <option selected={selectValue=='qina'?true:false} value="qina">Qina</option>
  <option selected={selectValue=='alexandria'?true:false} value="alexandria">Alexandria</option>
  <option selected={selectValue=='aswan'?true:false} value="aswan">Aswan</option>
  <option selected={selectValue=='luxor'?true:false} value="luxor">Luxor</option>
  <option selected={selectValue=='fayoum'?true:false} value="fayoum">Fayoum</option>
</select>
<div className='time-left-small'>
<h3>Time Left to {nextPrayer} : </h3>
<h3 className='remaining-time'>{remainingTime}</h3>
</div>

    </div>
    <div className='time-left'>
<h3>Time Left to {nextPrayer} : </h3>
<h3 className='remaining-time'>{remainingTime}</h3>
</div>
  <div className='top-card-container'>
    <TopCard first={true} currentPrayer={currentPrayer}  endTime={currentPrayerEnd} />
       <TopCard first={false} nextPrayer={nextPrayer} nextPrayerTime={prayers[0]?.nextPrayer}  endTime={nextPrayerEnd} />
    </div>
    
  </div>
    </main>
    </>
  )
}
