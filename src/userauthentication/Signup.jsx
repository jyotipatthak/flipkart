import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection,addDoc } from 'firebase/firestore';



const SignUp = () => {

  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : ''
  })

  const addUser = async () => {
    try {
      const docRef = await addDoc(collection(db, 'user'), {
        user : formData
      })
      toast.success('User registered successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        console.log(docRef.email)
    } catch (error) {
      toast.error('Error in registering the user', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.error("Error adding user info", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name] : value})
  }

  

  return (
    <div className="min-h-screen flex items-center mt-16 justify-center bg-gray-100">
      <div className="bg-white h-screen shadow-md rounded-lg overflow-hidden flex m-8 max-w-4xl w-full">
        <div className="w-2/5 bg-blue-500 text-white p-8 flex flex-col">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">Looks like you're new here!</h2>
          <p className="text-lg mb-8 tracking-wider text-left">Sign up with your Email to get started</p>
        </div>
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="mb-4">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">Sign up</h2>
              <label htmlFor="password" className="block text-sm text-left font-semibold text-gray-600">Enter your name</label>
              <input
                 labelText={"Full Name"}
                 inputPlaceholder={"What is your name?"}
                   inputType={"text"}
                   required={false}
                   value={formData.name}
                    onChange={handleInputChange}
                   name="name"
                className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
                
              />
            </div>
            <div className="mb-4">
        
              
              <label htmlFor="email" className="block text-sm text-left font-semibold text-gray-600">Enter your Email</label>
              <input

labelText={"Email ID"}
            inputPlaceholder={"Tell us your email id"}
            inputType={"email"}
            required={false}
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
             />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-left font-semibold text-gray-600">Enter your Password</label>
              <input
                labelText={"Password"}
            inputPlaceholder={"(Minimum 6 characters)"}
            inputType={"password"}
            required={false}
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
              
              />
            </div>
            <button type="submit" className="bg-orange-500 text-white py-2 rounded-md font-semibold">CONTINUE</button>
          </form>
          <div className="mt-4 text-center container hover:bg-white py-3 bg-white border-x-2 border-b-2 px-8">
            <Link to="/login" className="text-blue-500">Existing User? Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
