import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "user"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let userArray = [];
      querySnapshot.forEach((doc) => {
        userArray.push({ ...doc.data(), id: doc.id });
      });
      console.log("Fetched users:", userArray); // Log fetched users
      setUsers(userArray);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUserCredentials();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkUserCredentials = () => {
    const user = users.find(user => 
      user.user.email === formData.email && user.user.password === formData.password
    );

    if (user) {
      toast.success('User logged in successfully', {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'dark'
      });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      toast.error('Invalid Credentials', {
        position: 'top-right',
        autoClose: 5000
      });
      console.log("Invalid credentials for:", formData); // Log invalid credentials
    }
  };

  return (
    <div className="p-8 flex items-center justify-center mt-8 bg-gray-100">
      <div className="bg-white min-h-screen shadow-md rounded-lg overflow-hidden flex m-8 max-w-4xl w-full">
        <div className="w-2/5 bg-blue-500 text-white p-8 flex flex-col">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">Login</h2>
          <p className="text-lg mb-8 tracking-wider text-left">Get access to your order Wishlist and Recommendations</p>
        </div>
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-left font-semibold text-gray-600">Enter your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-x-0 border-t-0"
                placeholder="Enter Email ID / Username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-left font-semibold text-gray-600">Enter your Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-x-0 border-t-0"
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="bg-orange-500 text-white py-2 rounded-md font-semibold">CONTINUE</button>
          </form>
          <div className="mt-4 text-center container hover:bg-white py-3 bg-white border-x-2 border-b-2 px-8">
            <Link to="/signup" className="text-blue-500">New User? Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
