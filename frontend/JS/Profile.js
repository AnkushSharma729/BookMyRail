import { auth, db, doc, setDoc, getDoc, onAuthStateChanged } from './firebaseConfig.js';

// Simple captcha generator
function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const captchaEl = document.getElementById('captchaCode');
    if (captchaEl) captchaEl.textContent = code;
}

document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
    const refreshBtn = document.getElementById('refreshCaptcha');
    if (refreshBtn) refreshBtn.addEventListener('click', generateCaptcha);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Pre-fill email
            document.getElementById('email').value = user.email;
            
            // Try to load existing profile data
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.username) document.getElementById('username').value = data.username;
                    if (data.fullName) {
                         document.getElementById('firstName').value = data.fullName.split(' ')[0] || '';
                    }
                    if (data.lastName) document.getElementById('lastName').value = data.lastName;
                    if (data.phone) document.getElementById('mobile').value = data.phone;
                    // Add more fields as needed if they exist in your data structure
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        } else {
            alert("Please login to view/edit your profile.");
            window.location.href = "Signup.html";
        }
    });

    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputCode = document.getElementById('captchaInput').value.trim();
        const actualCode = document.getElementById('captchaCode').textContent;

        if (inputCode.toUpperCase() !== actualCode) {
            alert('Captcha does not match. Please try again.');
            generateCaptcha();
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in.");
            return;
        }

        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            fullName: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            lastName: document.getElementById('lastName').value,
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
            occupation: document.getElementById('occupation').value,
            phone: document.getElementById('mobile').value,
            nationality: document.getElementById('nationality').value,
            marital: document.getElementById('marital').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            country: document.getElementById('country').value,
            updatedAt: new Date()
        };

        try {
            await setDoc(doc(db, "users", user.uid), data, { merge: true });
            alert('Profile updated successfully!');
            generateCaptcha();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile: " + error.message);
        }
    });
});
