import { db, collection, getDocs, query, where } from './firebaseConfig.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("scheduleForm");
    const resultDiv = document.getElementById("result");

    const mockSchedule = [
        { station: "New Delhi", arrival: "—", departure: "20:45", halt: "-" },
        { station: "Agra Cantt", arrival: "23:05", departure: "23:15", halt: "10 min" },
        { station: "Jhansi Jn", arrival: "02:50", departure: "03:00", halt: "10 min" },
        { station: "Bhopal Jn", arrival: "06:00", departure: "06:05", halt: "5 min" },
        { station: "Itarsi Jn", arrival: "08:30", departure: "08:35", halt: "5 min" },
        { station: "Nagpur", arrival: "12:20", departure: "12:25", halt: "5 min" },
        { station: "Kazipet", arrival: "18:40", departure: "18:45", halt: "5 min" },
        { station: "Secunderabad", arrival: "21:15", departure: "21:20", halt: "5 min" },
        { station: "Bengaluru", arrival: "06:30", departure: "—", halt: "-" }
    ];

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const trainNumber = document.getElementById("trainNumber").value.trim();
        const trainName = document.getElementById("trainName").value.trim();
        const date = document.getElementById("date").value;

        if (!trainNumber || !trainName) {
            alert("Please enter both Train Number and Train Name.");
            return;
        }

        resultDiv.innerHTML = "Searching for schedule...";

        try {
            // Attempt to fetch from Firestore if a collection 'schedules' exists
            const q = query(collection(db, "schedules"), where("trainNumber", "==", trainNumber));
            const querySnapshot = await getDocs(q);
            
            let scheduleToDisplay = mockSchedule; // Fallback to mock

            if (!querySnapshot.empty) {
                const data = querySnapshot.docs[0].data();
                if (data.stops) {
                    scheduleToDisplay = data.stops;
                }
            }

            let html = `
                <h2>Schedule for ${trainNumber} – ${trainName} on ${date}</h2>
                <table>
                  <tr>
                    <th>Train Number</th>
                    <th>Train Name</th>
                    <th>Station</th>
                    <th>Arrival</th>
                    <th>Departure</th>
                    <th>Halt</th>
                  </tr>`;
            
            scheduleToDisplay.forEach(stop => {
                html += `<tr>
                          <td>${trainNumber}</td>
                          <td>${trainName}</td>
                          <td>${stop.station}</td>
                          <td>${stop.arrival}</td>
                          <td>${stop.departure}</td>
                          <td>${stop.halt}</td>
                        </tr>`;
            });
            html += `</table>`;
            resultDiv.innerHTML = html;

        } catch (error) {
            console.error("Schedule error:", error);
            resultDiv.innerHTML = "Error fetching schedule. Displaying demo data.<br>" + html;
        }
    });
});
