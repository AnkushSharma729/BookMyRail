# BookMyRail 🚂

**BookMyRail** is a modern, serverless Railway Reservation System designed to provide a seamless ticket booking experience. Built using a robust frontend and powered by Firebase, the application handles user authentication, real-time database operations, and secure data management without the need for a traditional backend server.

## 🚀 Features

- **User Authentication**: Secure Signup and Login using Firebase Auth.
- **Real-time Database**: Powered by Cloud Firestore for storing user profiles, reservations, and train schedules.
- **Ticket Booking**: Easy-to-use booking form with automatic 10-digit PNR generation.
- **PNR Status Lookup**: Real-time status checking of reservations using PNR numbers.
- **Profile Management**: Dynamic user profiles that auto-fill and update directly in the database.
- **Ticket Management**: Integrated cancellation and rescheduling functionality.
- **Modern UI**: Clean, responsive design with CSS-driven animations and modular JavaScript.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6 Modules)
- **Backend-as-a-Service**: [Firebase](https://firebase.google.com/)
  - **Firebase Authentication**: For managing user accounts.
  - **Cloud Firestore**: A NoSQL document database for all real-time data.

## 📂 Project Structure

```text
Railways Reservations/
├── frontend/
│   ├── CSS/              # Custom stylesheets for each page
│   ├── JS/               # Modular JavaScript logic and Firebase integration
│   │   ├── firebaseConfig.js   # Firebase initialization and exports
│   │   ├── Script.js           # Global UI and Auth state listener
│   │   ├── Reservations.js     # Booking logic
│   │   ├── PNR.js              # PNR status lookup logic
│   │   └── ...                 # Other page-specific modules
│   ├── img/              # Image assets and logos
│   ├── index.html        # Main landing page
│   ├── Reservations.html # Ticket booking page
│   ├── PNR.html          # PNR status page
│   └── ...               # Other application pages
└── backend/              # (Optional) Node/Express legacy backend
```

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnkushSharma729/BookMyRail.git
   ```

2. **Firebase Configuration**:
   The project is pre-configured to use a specific Firebase instance. If you want to use your own:
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password) and **Firestore Database** (Test Mode).
   - Update `frontend/JS/firebaseConfig.js` with your own configuration keys.

3. **Run the application**:
   Since the project uses ES Modules, it is recommended to run it through a local web server:
   - **VS Code**: Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
   - **Python**: Run `python -m http.server` in the `frontend` folder.
   - **Node.js**: Use `npx serve` or similar.

## 📝 License

This project is licensed under the MIT License.

---
Built with ❤️ by Ankush Sharma
