import { useState } from 'react'
import './styles/app.scss'
import './App.css'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import ApiContextProvider from './context/ApiContextProvider'

function App() {

  return (
    <>
 <ApiContextProvider>
 <Header/>
 <Home/>
 </ApiContextProvider>
    </>
  )
}

export default App
