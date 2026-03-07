import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DogForm.css";

export default function AddDog() {
  const navigate = useNavigate();

  const [dog, setDog] = useState({
    name: "",
    image: "",
    title: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    description: ""
  });

  const handleChange = (e) => {
    setDog({
      ...dog,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/dogs", dog);
      alert("Dog added successfully 🐶");
      navigate("/dogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dog-form-container">
      <h2>Add New Dog</h2>

      <form className="dog-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Dog Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter dog name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image link"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Short title"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Breed</label>
          <input
            type="text"
            name="breed"
            placeholder="Dog breed"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder="Dog color"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Write description about the dog"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Dog</button>

      </form>
    </div>
  );
}