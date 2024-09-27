import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'
import NavBar from "./components/NavBar" 
import Footer from './components/Footer';
import DisplayShoppingList from './pages/DisplayShoppingList';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoPage from './pages/NoPage';
import Privacy from './pages/PrivacyPolicy';
import AddToShoppingList from './features/AddToShoppingList';

function App() {
 

  return (
    <>
    <BrowserRouter>

<div className='w-full  mx-[20px] bg-slate-700'>
 <NavBar />

 <Routes>
   <Route path='/' element={ <HomePage/>} /> 
   <Route index element={<HomePage/>}/>
   <Route path='/DisplayShoppingList' element={ <DisplayShoppingList/> } /> 
   <Route path='/Login' element={ <LoginPage/> } />
   <Route path='/Register' element={ < RegisterPage/> } /> 
   <Route path='/AddNew' element={ <AddToShoppingList/> } />
    <Route path="/Privacy" element={<Privacy />} />
    <Route path="*" element={<NoPage />} />
  
 </Routes>
 <Footer/>
 </div> 
</BrowserRouter>
    </>
  )
}

export default App
