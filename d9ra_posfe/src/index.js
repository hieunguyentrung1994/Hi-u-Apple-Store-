import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={2500}
          closeOnClick
          pauseOnHover={false}
        />
    <App />
  </BrowserRouter>
);

reportWebVitals();
