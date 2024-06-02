import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './userauthentication/Signup';
import Login from './userauthentication/Login';
import HeroHome from './components/HeroHome';
import Product from './components/products';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {

  return (
    // BrowserRouter component to enable routing
    <BrowserRouter>
      {/* Navbar component */}
      <Navbar />
      
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    
      {/* Routes component for defining routes */}
      <Routes>
        
        <Route path='/' element={<HeroHome />} /> {/* Route for the home page */}
        
        <Route path='/signup' element={<SignUp />} />  {/* Route for the signup page */}
      
        <Route path='/login' element={<Login />} />      {/* Route for the login page */}
       
        <Route path='/product' element={<Product />} />    {/* Route for the product page */}
        
        <Route path='/cart'  element={<Cart/>} />   {/* Route for the cart page */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
