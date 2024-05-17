import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.API_FIREBASE,
    authDomain: "blog-app-b9fa7.firebaseapp.com",
    projectId: "blog-app-b9fa7",
    storageBucket: "blog-app-b9fa7.appspot.com",
    messagingSenderId: "440252213205",
    appId: "1:440252213205:web:8c2e6ae82de55f6abdff5c"
};

export const app = initializeApp(firebaseConfig);