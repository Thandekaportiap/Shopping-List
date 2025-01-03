import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoPage from './pages/NoPage';
import Privacy from './pages/PrivacyPolicy';
import AddToShoppingList from './features/AddToShoppingList';
import ShoppingListDisplay from './features/Shopping/ShoppingListDisplay';
import EditShoppingList from './features/Shopping/EditList';
import DisplayList from './pages/DisplayList';

function App() {
  const [id, setId] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem('loggedInUserId');
    if (savedUserId) {
      setId(savedUserId);
    }
  }, []);

  const handleLogin = (userId) => {
    setId(userId);
    localStorage.setItem('loggedInUserId', userId); 
  };

  const handleLogout = () => {
    setId(null);
    localStorage.removeItem('loggedInUserId'); 
  };

  return (
    <>
      <BrowserRouter>
        <div className=' bg-slate-700 text-[#C087BF] '>
          <NavBar id={id} onLogout={handleLogout} />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route index element={<HomePage />} />
            <Route path='/shoppingList' element={<DisplayList id={id} />} />
            <Route path="/shoppingList/:id" element={<ShoppingListDisplay  />} />
            <Route path="/edit/:id" element={<EditShoppingList />} />
            <Route path='/Login' element={<LoginPage onLogin={handleLogin} />} />
            <Route path='/Register' element={<RegisterPage />} />
            <Route path='/AddNew' element={<AddToShoppingList userId={id} />} />
            <Route path="/Privacy" element={<Privacy />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
