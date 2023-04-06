importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyC7IQeef1TmDeVaYGj6U3HF7j_lTYDXzjs",
    authDomain: "buloke-47e9d.firebaseapp.com",
    projectId: "buloke-47e9d",
    storageBucket: "buloke-47e9d.appspot.com",
    messagingSenderId: "202932134311",
    appId: "1:202932134311:web:35a302a87cf2eba9725682",
    measurementId: "G-P6BNVLWDD9"
})

const messaging = firebase.messaging();