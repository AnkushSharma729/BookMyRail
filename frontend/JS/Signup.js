import { auth, signInWithEmailAndPassword } from './firebaseConfig.js';

document.getElementById('signinForm').addEventListener('submit', async function(e){
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // basic reset of error visibility if needed, though Firebase handles real auth errors
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Login successful
        alert("Logged in successfully!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error signing in:", error);
        
        // Show generic error or map specific firebase errors
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            alert("Invalid email or password.");
        } else {
            alert(error.message);
        }
    }
});