import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6DbU2XcqMihVLPRqrCuMlWWD6uWur1x8",
    authDomain: "auth-aa497.firebaseapp.com",
    projectId: "auth-aa497",
    storageBucket: "auth-aa497.firebasestorage.app",
    messagingSenderId: "682580697216",
    appId: "1:682580697216:web:63bfe84148c6e9310c8665",
    measurementId: "G-Y9QK3GW230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign Up
document.getElementById("signup-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Sign up successfully!!");
            window.location.href = "welcome.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login
document.getElementById("login-btn")?.addEventListener("click", () => {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "welcome.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Google Sign-In
document.getElementById("google-btn")?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then(() => {
            alert("Login Successful!");
            window.location.href = "welcome.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Reset Password
document.getElementById("reset-password-link")?.addEventListener("click", () => {
    let email = prompt("Enter your email address:");
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent! Please check your inbox.");
            })
            .catch((error) => {
                alert(error.message);
            });
    } else {
        alert("Please enter a valid email address.");
    }
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("Logged Out Successfully!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Auth State Change
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes("welcome.html")) {
        document.getElementById("user-email").textContent = user.email;
    } else if (!user && window.location.pathname.includes("welcome.html")) {
        window.location.href = "index.html";
    }
});
