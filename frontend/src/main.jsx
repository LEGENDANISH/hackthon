import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard"; // Make sure you have this component
import FinanceDetails from "./components/Fin"
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/finance-details" element={<FinanceDetails />} />
    </Routes>
  </BrowserRouter>
);
