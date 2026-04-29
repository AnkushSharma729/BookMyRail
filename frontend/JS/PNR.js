import { db, collection, getDocs, query, where } from './firebaseConfig.js';

document.getElementById('pnrForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const pnrInput = document.getElementById('pnr').value.trim();
  const resultDiv = document.getElementById('result');

  if(!/^\d{10}$/.test(pnrInput)){
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Please enter a valid 10-digit PNR number.';
    return;
  }

  resultDiv.style.display = 'block';
  resultDiv.textContent = 'Checking status...';

  try {
    const q = query(collection(db, "reservations"), where("pnr", "==", pnrInput));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      resultDiv.textContent = 'PNR not found. Please check the number and try again.';
      return;
    }

    const booking = querySnapshot.docs[0].data();
    resultDiv.innerHTML = `
      <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-top: 20px;">
        <h3 style="color: #60a5fa;">Booking Details</h3>
        <p><strong>PNR:</strong> ${booking.pnr}</p>
        <p><strong>Passenger:</strong> ${booking.passengerName}</p>
        <p><strong>From:</strong> ${booking.from}</p>
        <p><strong>To:</strong> ${booking.to}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Status:</strong> <span style="color: #4ade80;">${booking.status}</span></p>
      </div>
    `;

  } catch (error) {
    console.error("PNR check error:", error);
    resultDiv.textContent = 'Error fetching PNR status: ' + error.message;
  }
});