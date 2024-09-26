import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'

function App() {
 

  return (
    <>
    <BrowserRouter>

<div className='w-full  mx-[20px]'>
 {/* <Navbar /> */}

 <Routes>
   <Route path='/' element={ <RegisterPage/>} /> 
   <Route index element={<RegisterPage/>}/>
   {/* <Route path='/about-us' element={ <AboutUs/> } /> 
   <Route path='/contact-us' element={ <ContactUs/> } />
   <Route path='/logIn' element={ <LogIn/> } />
   <Route path='/ Registration' element={ < Registration/> } /> 
   <Route path='/Homelist' element={ <Homelist/> } /> */}
  
 </Routes>
 {/* <Footer/> */}
 </div> 
</BrowserRouter>
    </>
  )
}

export default App
