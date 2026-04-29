import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from './firebaseConfig.js';

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = form.elements['fullname'].value;
    const lastName = form.elements['last name'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['Number'].value;
    const password = form.elements['password'].value;
    const confirmPassword = form.elements['confirm-password'].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    try {
        // 1. Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Save additional data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            lastName: lastName,
            email: email,
            phone: phone,
            createdAt: new Date()
        });

        alert("Account created successfully! Redirecting...");
        window.location.href = "index.html";
        
    } catch (error) {
        console.error("Error signing up:", error);
        alert(error.message);
    }
});