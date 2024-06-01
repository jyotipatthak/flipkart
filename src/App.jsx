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
    <BrowserRouter>
      <Navbar />
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    
      <Routes>
        <Route path='/' element={<HeroHome />} /> 
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/product' element={<Product />} />
        <Route path='/cart'  element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
