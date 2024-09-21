import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./services/context/AuthContex";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <AuthProvider>
   <Provider store={store}><App /></Provider>
  </AuthProvider>
);
