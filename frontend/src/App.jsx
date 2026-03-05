import { useState } from "react";
import "./App.css";
import Home from "./home";
import Alldogs from "./Alldogs";
import DogDetails from "./DogDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Alldogs />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
