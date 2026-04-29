import { auth, db, collection, addDoc, onAuthStateChanged } from './firebaseConfig.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  let currentUser = null;

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (!user) {
      alert("Please login first to book a ticket.");
      window.location.href = "Signup.html";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentUser) {
        alert("You must be logged in to book a ticket.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("mobile").value.trim(); // Fixed ID based on HTML
    const fromStation = document.getElementById("from").value;
    const toStation = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const passengers = document.getElementById("passengers").value;
    const travelClass = document.getElementById("class").value;

    if (!name || !phone || !fromStation || !toStation || !date || !passengers || !travelClass) {
        alert("Please fill all fields correctly.");
        return;
    }

    if (fromStation === toStation) {
        alert("Origin and destination cannot be the same.");
        return;
    }

    // Generate a random 10-digit PNR
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    try {
        await addDoc(collection(db, "reservations"), {
            uid: currentUser.uid,
            passengerName: name,
            phone: phone,
            from: fromStation,
            to: toStation,
            date: date,
            passengers: parseInt(passengers),
            class: travelClass,
            pnr: pnr,
            status: "Confirmed",
            createdAt: new Date()
        });

        alert(`Booking Successful!\n\nPNR Number: ${pnr}\nPassenger: ${name}\nFrom: ${fromStation}\nTo: ${toStation}\nDate: ${date}`);
        form.reset();
        
    } catch (error) {
        console.error("Booking error:", error);
        alert("Error booking ticket: " + error.message);
    }
  });
});
