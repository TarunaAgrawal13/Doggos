import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Alldogs from "./Alldogs";
import DogDetails from "./DogDetail";
import AddDog from "./AddDog";
import EditDog from "./EditDog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dogs" element={<Alldogs />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path="/add-dog" element={<AddDog />} />
        <Route path="/edit-dog/:id" element={<EditDog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
