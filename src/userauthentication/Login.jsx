import React, { useState } from "react";
import Toast from "../ui/Toast";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase"; // Import the initialized auth
import { login } from "../redux/actions";

const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  // Function to handle email/password login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("User Credential:", userCredential); // Log user credentials

      // Extract user and token
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log(user);

      // Dispatch the login action with the token
      dispatch(login(token));

      // Navigate to home page
      navigate("/");
      Toast.success("User logged in successfully");
    } catch (error) {
      Toast.error(`Error in logging in the user: ${error.message}`);
      console.error("Error logging in user", error);
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Check if account exists for the given email
      const methods = await fetchSignInMethodsForEmail(auth, formData.email);
      if (methods.length === 0) {
        Toast.error("No account found with this email. Please sign up first.");
        return;
      }

      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log(user);

      // Dispatch the login action with the token
      dispatch(login(token));

      // Navigate to home page
      navigate("/");
      Toast.success("User logged in with Google successfully");
    } catch (error) {
      console.error("Google Login Error", error);
      Toast.error(`Error in logging in with Google: ${error.message}`);
    }
  };

  // Function to handle GitHub login
  const handleGithubLogin = async () => {
    try {
      // Check if account exists for the given email
      const methods = await fetchSignInMethodsForEmail(auth, formData.email);
      if (methods.length === 0) {
        Toast.error("No account found with this email. Please sign up first.");
        return;
      }

      // Sign in with GitHub
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log(user);

      // Dispatch the login action with the token
      dispatch(login(token));

      // Navigate to home page
      navigate("/");
      Toast.success("User logged in with GitHub successfully");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const existingEmail = error.customData.email;
        const pendingCred = GithubAuthProvider.credentialFromError(error);

        // Check if the existing account uses email/password sign-in method
        const providers = await fetchSignInMethodsForEmail(auth, existingEmail);
        if (providers.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
          const password = prompt(
            "Please enter your password to link GitHub with your existing account"
          );
          if (password) {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                existingEmail,
                password
              );
              await userCredential.user.linkWithCredential(pendingCred);
              const token = await userCredential.user.getIdToken();
              dispatch(login(token));
              navigate("/");
              Toast.success(
                "User logged in with GitHub and linked with existing account successfully"
              );
            } catch (linkError) {
              Toast.error(`Error linking accounts: ${linkError.message}`);
              console.error("Error linking accounts", linkError);
            }
          } else {
            Toast.error("Password is required to link accounts");
          }
        } else {
          Toast.error("Email is already associated with another provider");
        }
      } else {
        Toast.error(`Error in logging in with GitHub: ${error.message}`);
        console.error("Error logging in with GitHub", error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="min-h-screen flex items-center justify-center mt-16 bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row m-4 max-w-4xl w-full">
        <div className="md:w-2/5 bg-blue-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
            Welcome Back!
          </h2>
          <p className="text-lg mb-8 tracking-wider text-left">
            Log in with your Email to continue
          </p>
        </div>
        <div className="md:w-3/5 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
                Log in
              </h2>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-left font-semibold text-gray-600"
              >
                Enter your Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-red-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-left font-semibold text-gray-600"
              >
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-red-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600"
            >
              CONTINUE
            </button>
          </form>
          <div className="mt-4 text-center flex">
            <button
              onClick={handleGoogleLogin}
              className="w-full hover:bg-gray-900 hover:text-white text-black font-bold py-2 px-4 rounded mt-2 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.4 0 6.4 1.3 8.8 3.4l6.4-6.4C34.6 2.5 29.7 0 24 0 14.7 0 6.8 5.8 3 14.2l7.5 5.8C12 11.8 17.5 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M47.5 24c0-1.6-.2-3.1-.5-4.5H24v9h13.4c-.6 3.2-2.6 5.9-5.4 7.7l7.5 5.8C43.7 37.2 47.5 31 47.5 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.2c-1-2.5-1.5-5.3-1.5-8.2s.5-5.7 1.5-8.2l-7.5-5.8C1.5 10.3 0 16 0 24s1.5 13.7 4.5 18.8l7.5-5.8z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.5 0 12-2.1 16.1-5.7l-7.5-5.8c-2.1 1.4-4.8 2.2-7.6 2.2-6.5 0-12-4.4-13.9-10.4l-7.5 5.8C6.8 42.2 14.7 48 24 48z"
                />
              </svg>
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full hover:bg-gray-900 hover:text-white text-black font-bold py-2 px-4 rounded mt-2 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.58v-2.157c-3.338.725-4.04-1.415-4.04-1.415-.546-1.387-1.334-1.757-1.334-1.757-1.088-.744.083-.729.083-.729 1.203.084 1.836 1.235 1.836 1.235 1.07 1.833 2.806 1.303 3.492.995.108-.774.42-1.304.763-1.604-2.665-.305-5.467-1.333-5.467-5.932 0-1.31.468-2.38 1.236-3.22-.124-.304-.536-1.526.116-3.176 0 0 1.008-.322 3.302 1.23.96-.267 1.98-.4 3-.404 1.02.004 2.04.137 3 .404 2.294-1.552 3.3-1.23 3.3-1.23.652 1.65.24 2.872.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.805 5.625-5.475 5.922.432.372.816 1.104.816 2.226v3.293c0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
              Github
            </button>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <Link to="/signup" className="text-blue-500">
              Don't have an account? Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
