import { db, collection, getDocs } from './firebaseConfig.js';

export async function getTrains() {
  try {
    const querySnapshot = await getDocs(collection(db, "trains"));
    const trains = [];
    querySnapshot.forEach((doc) => {
      trains.push({ id: doc.id, ...doc.data() });
    });
    return trains;
  } catch (err) {
    console.error("Firestore error:", err);
    return [];
  }
}
