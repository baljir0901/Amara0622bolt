// src/firebase.ts
import React from 'react';

import { initializeApp } from 'firebase/app'; // Firebase SDK-ийн үндсэн функцийг импортлох
import ContactForm from './ContactForm'; // ContactForm компонентийг импортлох


// Таны Firebase төслийн тохиргоо.
// Энэ мэдээллийг Firebase Console-оос авах ёстой.
// Project settings -> Your apps -> Web app хэсэгт байрлана.
const firebaseConfig = {
  apiKey: "AIzaSyBJTkgPi812UOza5iVk1niDZuK4wG0div8",
  authDomain: "bolt-test-1df74.firebaseapp.com",
  projectId: "bolt-test-1df74",
  storageBucket: "bolt-test-1df74.firebasestorage.app",
  messagingSenderId: "796436884914",
  appId: "1:796436884914:web:c40f0dbaf83b593b4808ab"
};

// Firebase аппликейшнийг эхлүүлэх
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"> {/* Хуудасны үндсэн хүрээ, төвд байрлуулах */}
      <ContactForm /> {/* ContactForm компонентийг харуулах */}
    </div>
  );
}

// Эхлүүлсэн Firebase аппликейшнийг бусад файлуудад ашиглахын тулд экспортлох
export default App;
