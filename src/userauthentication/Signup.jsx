import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { auth } from "../../firebase"; // Import the initialized auth

const SignUp = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

      // Signed up
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log(user);

      toast.success("User registered successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/login");
    } catch (error) {
      toast.error(`Error in registering the user: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log(user);

      toast.success("User signed up with Google successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/");
    } catch (error) {
      toast.error(`Error up signing in with Google: ${error.message}`, {
        position: "dark-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log(user);

      toast.success("User signed up with GitHub successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const existingEmail = error.customData.email;
        const pendingCred = GithubAuthProvider.credentialFromError(error);

        const providers = await fetchSignInMethodsForEmail(auth, existingEmail);
        if (
          providers.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
        ) {
          const password = prompt(
            "An account already exists with this email. Please enter your password to link GitHub with your existing account."
          );
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
            toast.success(
              "User signed up with GitHub and linked with existing account successfully",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }
            );
          } catch (linkError) {
            toast.error(
              `Error linking GitHub with existing account: ${linkError.message}`,
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }
            );
          }
        } else {
          toast.error(
            "An account already exists with a different sign-in method. Please use the existing method to sign in.",
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
      } else {
        toast.error(`Error in signing in with GitHub: ${error.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
    <div className="min-h-screen flex items-center mt-16 justify-center bg-gray-100">
      <div className="bg-white h-screen shadow-md rounded-lg overflow-hidden flex m-8 max-w-4xl w-full">
        <div className="w-2/5 bg-blue-500 text-white p-8 flex flex-col">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
            Looks like you're new here!
          </h2>
          <p className="text-lg mb-8 tracking-wider text-left">
            Sign up with your Email to get started
          </p>
        </div>
        <div className="w-1/2 p-8">
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
                labelText={"Email ID"}
                inputPlaceholder={"Tell us your email id"}
                inputType={"email"}
                required={true}
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
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
                labelText={"Password"}
                inputPlaceholder={"(Minimum 6 characters)"}
                inputType={"password"}
                required={true}
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-md font-semibold"
            >
              CONTINUE
            </button>
          </form>
          <div className="mt-4 text-center  container hover:bg-white py-3 bg-white border-x-2 border-b-2 px-8">
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-900  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign up with Google
            </button>

            <button
              onClick={handleGithubSignIn}
              className="bg-gray-800 mt-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign up with GitHub
            </button>
            <hr></hr>

            <Link to="/login" className=" mt-4 text-blue-500">
              Existing User? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
