import { useState } from "react";
import "./App.css";
import Home from "./home";
import Alldogs from "./Alldogs";
import DogDetails from "./DogDetail";
import AddDog from "./AddDog";
import EditDog from "./EditDog";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Alldogs />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path="/add-dog" element={<AddDog />} />
        <Route path="/edit-dog/:id" element={<EditDog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
