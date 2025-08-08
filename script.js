import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const email = document.getElementById('email');
const password = document.getElementById('password');
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const authSection = document.getElementById('auth-section');
const mainSection = document.getElementById('main-section');

// Sign Up
signupBtn.addEventListener('click', () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      alert("Sign-up successful!");
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
});

// Login
loginBtn.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      alert("Logged in!");
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
});

// Logout
logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Logged out");
    });
});

// User state
onAuthStateChanged(auth, user => {
  if (user) {
    authSection.style.display = "none";
    mainSection.style.display = "block";
  } else {
    authSection.style.display = "block";
    mainSection.style.display = "none";
  }
});
