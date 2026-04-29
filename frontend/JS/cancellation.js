import { db, collection, getDocs, query, where, updateDoc, doc } from './firebaseConfig.js';

document.addEventListener("DOMContentLoaded", () => {
    // ===== Tab Switching =====
    const cancelTab = document.getElementById("cancelTab");
    const rescheduleTab = document.getElementById("rescheduleTab");
    const cancelSection = document.getElementById("cancelSection");
    const rescheduleSection = document.getElementById("rescheduleSection");

    cancelTab?.addEventListener("click", () => {
        cancelTab.classList.add("active");
        rescheduleTab.classList.remove("active");
        cancelSection.classList.add("active");
        rescheduleSection.classList.remove("active");
    });

    rescheduleTab?.addEventListener("click", () => {
        rescheduleTab.classList.add("active");
        cancelTab.classList.remove("active");
        rescheduleSection.classList.add("active");
        cancelSection.classList.remove("active");
    });

    // ===== Cancel Form =====
    document.getElementById("cancelForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pnr = document.getElementById("pnr").value.trim();
        const email = document.getElementById("email").value.trim();

        try {
            const q = query(collection(db, "reservations"), where("pnr", "==", pnr));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("PNR not found.");
                return;
            }

            const bookingDoc = querySnapshot.docs[0];
            const bookingData = bookingDoc.data();

            if (bookingData.status === "Cancelled") {
                alert("This ticket is already cancelled.");
                return;
            }

            await updateDoc(doc(db, "reservations", bookingDoc.id), {
                status: "Cancelled",
                cancelledAt: new Date()
            });

            alert(`✅ Ticket for PNR ${pnr} has been cancelled successfully.`);
            e.target.reset();

        } catch (error) {
            console.error("Cancellation error:", error);
            alert("Error cancelling ticket: " + error.message);
        }
    });

    // ===== Reschedule Form =====
    document.getElementById("rescheduleForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pnr = document.getElementById("pnrRes").value.trim();
        const newDate = document.getElementById("newDate").value;
        const newClass = document.getElementById("newClass").value;

        try {
            const q = query(collection(db, "reservations"), where("pnr", "==", pnr));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("PNR not found.");
                return;
            }

            const bookingDoc = querySnapshot.docs[0];

            await updateDoc(doc(db, "reservations", bookingDoc.id), {
                date: newDate,
                class: newClass,
                updatedAt: new Date()
            });

            alert(`🔄 Ticket for PNR ${pnr} has been rescheduled to ${newDate} (${newClass}).`);
            e.target.reset();

        } catch (error) {
            console.error("Reschedule error:", error);
            alert("Error rescheduling ticket: " + error.message);
        }
    });
});
