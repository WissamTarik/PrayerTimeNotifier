import { useState } from 'react'
import './styles/app.scss'
import './App.css'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import ApiContextProvider from './context/ApiContextProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import AllPrayers from './Components/AllPrayers/AllPrayers'

function App() {
  const router=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {path:'',element:<Home/>},
      {path:'/allPrayers',element:<AllPrayers/>}
    ]}
  ])

  return (
    <>
<ApiContextProvider>
<RouterProvider router={router}/>
 </ApiContextProvider>
    </>
  )
}

export default App
