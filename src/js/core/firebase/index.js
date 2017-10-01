import { initializeApp } from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCQjEEwQ92ayC_wKNeMpNQsjCZpp7pYoqQ",
    authDomain: "fbcms.firebaseapp.com",
    databaseURL: "https://fbcms.firebaseio.com",
    projectId: "firebase-fbcms",
    storageBucket: "firebase-fbcms.appspot.com",
    messagingSenderId: "216432911852"
};

export default initializeApp(config);
