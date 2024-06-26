import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAha03VAXgmiCUFR3HEdVFdF1pedn4UR_4",
    authDomain: "flipkart-e8aba.firebaseapp.com",
    projectId: "flipkart-e8aba",
    storageBucket: "flipkart-e8aba.appspot.com",
    messagingSenderId: "261346088320",
    appId: "1:261346088320:web:7cccf6e95b8e0570d05d65",
    measurementId: "G-VWZ3JF5YC1"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);   // Get authentication instance

export {auth}