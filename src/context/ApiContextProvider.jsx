import React, { createContext, useEffect, useState } from 'react'
import axios from './../../node_modules/axios/lib/axios';
import moment from 'moment';

export const apiContext=createContext()
export default function ApiContextProvider({children}) {
    const [myData, setMyData] = useState(null)
    const [date, setDate] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
     const [currentPrayer, setCurrentPrayer] = useState('')
      const [nextPrayer, setNextPrayer] = useState('')
      const [nextPrayerEnd, setNextPrayerEnd] = useState('')
      const [currentPrayerEnd, setCurrentPrayerEnd] = useState('')
      const [remainingTime, setRemainingTime] = useState('')
  const [prayers, setPrayers] = useState([])

      const currentDate=moment()
    async function getData(city) {
        setIsLoading(true)
        try {
            const {data}= await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=eg&city=${city}`)
             setDate(data.data.date)
             setMyData(data.data.timings)
             
            
        } catch (error) {
            console.log(error);
            
        }finally{
            setIsLoading(false)
        }
    }
    function checkNextAndCurrentPrayer(prayers){
   

        //  if(prayers.length>0){
        //      if(currentDate.isAfter(moment(prayers[0]?.Fajr,'hh:mm')) && currentDate.isBefore(moment(prayers[0]?.Sunrise,'hh:mm'))){
        //        console.log('Between fajr and dhuhr');
        //         setCurrentPrayer('Sunrise')
        //         setNextPrayer("Duhur")
        //         setCurrentPrayerEnd(prayers[0].Dhuhr)
        //         setNextPrayerEnd(prayers[0].Asr)
        //      }
        //      else if(currentDate.isAfter(moment(prayers[0]?.Sunrise,'hh:mm')) && currentDate.isBefore(moment(prayers[0].Dhuhr,"hh:mm"))){
        //        console.log('Between Fajr and Duhur');
        //        setCurrentPrayer('Sunrise')
        //        setCurrentPrayerEnd(prayers[0].Dhuhr)

        //        setNextPrayer("Dhuhr")
        //        setCurrentPrayerEnd(prayers[0].Dhuhr)
        //        setNextPrayerEnd(prayers[0].Asr)
        //      }
        //      else if(currentDate.isAfter(moment(prayers[0]?.Dhuhr,'hh:mm')) && currentDate.isBefore(moment(prayers[0].Asr,"hh:mm"))){
        //        console.log('Between Dhuhr and Asr');
        //        setCurrentPrayer('Dhuhr')
        //        setCurrentPrayerEnd(prayers[0].Asr)

        //        setNextPrayer("Asr")
        //        setCurrentPrayerEnd(prayers[0].Asr)
        //        setNextPrayerEnd(prayers[0].Maghrib)
        //      }
        //      else if(currentDate.isAfter(moment(prayers[0]?.Asr,'hh:mm')) && currentDate.isBefore(moment(prayers[0].Maghrib,"hh:mm"))){
        //        console.log('Between Asr and Maghrib');
        //        setCurrentPrayer('Asr')
        //        setNextPrayer("Maghrib")
        //        setCurrentPrayerEnd(prayers[0].Maghrib)
        //        setNextPrayerEnd(prayers[0].Isha)
        //      }
        //      else if(currentDate.isAfter(moment(prayers[0]?.Maghrib,'hh:mm')) && currentDate.isBefore(moment(prayers[0].Isha,"hh:mm"))){
        //        console.log('Between Maghrib and Isha');
        //        setCurrentPrayer('Maghrib')
        //        setNextPrayer("Isha")
        //        setCurrentPrayerEnd(prayers[0].Isha)
        //        setNextPrayerEnd(prayers[0].Fajr)
        //      }
        //      else{
        //        setCurrentPrayer('Isha')
        //        setNextPrayer('Fajr')
        //        setCurrentPrayerEnd(prayers[0].Fajr)
        //        setNextPrayerEnd(prayers[0].Dhuhr)
        //      }
        //     }
        const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  let now = moment();

  for (let i = 0; i < prayerNames.length; i++) {
    let startTime = moment(prayers[0][prayerNames[i]], 'HH:mm');
    let endTime = moment(prayers[0][prayerNames[(i + 1) % prayerNames.length]], 'HH:mm');

    if (now.isAfter(startTime) && now.isBefore(endTime)) {
      setCurrentPrayer(prayerNames[i]);
      setNextPrayer(prayerNames[(i + 1) % prayerNames.length]);
      setCurrentPrayerEnd(endTime.format('hh:mm A'));
      setNextPrayerEnd(moment(prayers[0][prayerNames[(i + 2) % prayerNames.length]], 'HH:mm').format('hh:mm A'));
      break;
    }
  }
          
             
    }
    function getTimeLeftToNextPrayer(){
     let timeDifference=moment(currentPrayerEnd,'hh:mm').diff(currentDate)
        if(timeDifference<0){
          const midNight=moment('23:59:59',"hh:mm:ss")
          const currentTimeDifference=midNight.diff(currentDate)
          const fajrTimeDifference=moment(currentPrayerEnd,'hh:mm').diff(moment('00:00','hh:mm'))
          timeDifference=currentTimeDifference+fajrTimeDifference
        }


     let duration=moment.duration(timeDifference)
     setRemainingTime(`${duration.hours().toString().padStart(2,0)} : ${duration.minutes().toString().padStart(2,0)} : ${duration.seconds().toString().padStart(2,0)}`)
     
      
      
    }
    
    useEffect(() => {
      const interval = setInterval(getTimeLeftToNextPrayer, 1000);
      return () => clearInterval(interval);
    }, [remainingTime,currentPrayerEnd]);
    useEffect(() => {
       if(myData){
         setPrayers([
           {
             Fajr: myData?.Fajr,
             Dhuhr: myData?.Dhuhr,
             Sunrise: myData?.Sunrise,
             Sunset: myData?.Sunset,
             Asr: myData?.Asr,
             Maghrib: myData?.Maghrib,
             Isha: myData?.Isha
           }
         ]);
       }
     
      }, [myData])
    
  return (
    <apiContext.Provider value={{isLoading,myData,prayers,getData,date,nextPrayer,currentPrayer,currentPrayerEnd,nextPrayerEnd,checkNextAndCurrentPrayer,getTimeLeftToNextPrayer,remainingTime,setPrayers}}>{children}</apiContext.Provider>
  )
}
