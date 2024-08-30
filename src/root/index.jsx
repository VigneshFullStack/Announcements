import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Login from "../components/login/Login.jsx";
import Home from "../components/Layout/Home.jsx";
import ScratchCard from "../components/common/QRCode/ScratchCard.jsx";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scratch-card" element={<ScratchCard />} />
      </Routes>
    </Router>
  );
};

export default Root;
