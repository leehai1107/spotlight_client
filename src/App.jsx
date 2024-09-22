import React from "react";

// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toasts

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right" // Position of toast (optional)
        autoClose={3500} // Auto close after 5 seconds (optional)
        hideProgressBar={false} // Display progress bar (optional)
        newestOnTop={false} // Show newest toast on top (optional)
        closeOnClick // Close the toast when clicked
        rtl={false} // Right to left layout for text (optional)
        pauseOnFocusLoss // Pause toast when window loses focus
        draggable // Make the toast draggable
        pauseOnHover // Pause toast when hovered
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
