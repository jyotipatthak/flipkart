import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import Toast from "../ui/Toast";
import { login } from "../redux/actions"; // Import the login action

const SignUp = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const addUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      dispatch(login(token)); // Dispatch login action with token
      Toast.success("User registered successfully");
      navigate("/"); // Navigate to home or any other route
    } catch (error) {
      Toast.error(`Error in registering the user: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      dispatch(login(token)); // Dispatch login action with token
      Toast.success("User signed up with Google successfully");
      navigate("/"); // Navigate to home or any other route
    } catch (error) {
      Toast.error(`Error signing in with Google: ${error.message}`);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const token = await user.getIdToken();
      dispatch(login(token)); // Dispatch login action with token
      Toast.success("User signed up with GitHub successfully");
      navigate("/"); // Navigate to home or any other route
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const existingEmail = error.customData.email;
        const pendingCred = GithubAuthProvider.credentialFromError(error);
        try {
          // Fetch the sign-in methods for the existing email
          const providers = await fetchSignInMethodsForEmail(auth, existingEmail);
          if (providers.length > 0) {
            // Sign in with the first available provider
            let signInResult;
            if (providers.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
              const password = prompt("An account already exists with this email. Please enter your password to link GitHub with your existing account.");
              signInResult = await signInWithEmailAndPassword(auth, existingEmail, password);
            } else if (providers.includes(GoogleAuthProvider.PROVIDER_ID)) {
              signInResult = await signInWithPopup(auth, googleProvider);
            }
            // Link the GitHub credential with the existing account
            if (signInResult) {
              await signInResult.user.linkWithCredential(pendingCred);
              const token = await signInResult.user.getIdToken();
              dispatch(login(token)); // Dispatch login action with token
              Toast.success("GitHub account linked successfully with the existing account");
              navigate("/"); // Navigate to home or any other route
            }
          } else {
            Toast.error("No sign-in method available for this email.");
          }
        } catch (linkError) {
          Toast.error(`Error linking GitHub with existing account: ${linkError.message}`);
        }
      } else {
        Toast.error(`Error signing in with GitHub: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-16 bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row m-4 max-w-4xl w-full">
        <div className="md:w-2/5 bg-blue-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
            Looks like you're new here!
          </h2>
          <p className="text-lg mb-8 tracking-wider text-left">
            Sign up with your Email to get started
          </p>
        </div>
        <div className="md:w-3/5 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
                Sign up
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
              onClick={handleGoogleSignIn}
              className="w-full hover:bg-gray-900 hover:text-white text-black font-bold py-2 px-4 rounded mt-2  flex items-center justify-center"
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
                  d="M10.5 28.2c-1-2.5-1.5-5.2-1.5-8s.5-5.5 1.5-8l-7.5-5.8C1.8 10.9 0 17.2 0 24s1.8 13.1 4.5 18.6l7.5-5.8z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.5 0 12-2.1 16.1-5.7l-7.5-5.8c-2.1 1.4-4.8 2.3-7.7 2.3-6.2 0-11.5-4.2-13.4-10l-7.5 5.8C6.8 42.2 14.7 48 24 48z"
                />
              </svg>
               Google
            </button>
            <button
              onClick={handleGithubSignIn}
              className="w-full hover:bg-gray-900 text-black font-bold py-2 px-4 rounded mt-2 hover:text-white flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 0C5.37 0 0 5.373 0 12c0 5.304 3.438 9.8 8.205 11.385.6.111.82-.261.82-.579 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.614-4.042-1.614C4.422 17.544 3.633 17.2 3.633 17.2c-1.087-.744.082-.729.082-.729 1.202.084 1.836 1.235 1.836 1.235 1.07 1.832 2.807 1.303 3.492.997.108-.775.419-1.303.762-1.602-2.665-.302-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.984-.4 3.004-.404 1.02.004 2.047.137 3.004.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.609-2.805 5.625-5.475 5.922.43.371.814 1.102.814 2.222 0 1.606-.015 2.896-.015 3.291 0 .321.217.694.825.576C20.565 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
               GitHub
            </button>
            </div>
            <hr className="my-4" />
            <div className="text-center" >
           
            <Link to="/login" className="text-blue-500">
              Existing User? Log in
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
