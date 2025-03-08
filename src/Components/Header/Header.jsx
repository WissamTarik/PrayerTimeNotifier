import moment from 'moment-hijri'
import React, { useContext } from 'react'
import { apiContext } from '../../context/ApiContextProvider'

export default function Header() {
    moment.locale('en')
    const currentDate=moment().format('dddd,DD MMMM YYYY')
    const {date}=useContext(apiContext)
    
  return (
    <header>
        <h1>{date?.hijri.day} {date?.hijri.month.en} , {date?.hijri.year}</h1>
        <h2>{currentDate}</h2>
    </header>
  )
}
