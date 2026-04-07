import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DogForm.css";
import Navbar from "./components/Navbar";

export default function AddDog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [dog, setDog] = useState({
    name: "",
    image: "",
    title: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    description: "",
  });

  const handleChange = (e) => {
    setDog({ ...dog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/dogs`,
        dog,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dogs");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dog-form-container">
        <h2>Add a New <span>Dog</span></h2>
        <p>Fill in the details below to list your furry friend on PawConnect.</p>

        <div className="dog-form-card">
          <form className="dog-form" onSubmit={handleSubmit}>

            {/* Name + Image */}
            <div className="form-group">
              <label>Dog Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Bruno"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/dog.jpg"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Playful & Energetic Companion"
                onChange={handleChange}
              />
            </div>

            <div className="form-divider" />

            {/* Breed + Color in a row */}
            <div className="form-row">
              <div className="form-group">
                <label>Breed</label>
                <input
                  type="text"
                  name="breed"
                  placeholder="e.g. Golden Retriever"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="e.g. Golden"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Age + Weight in a row */}
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 2"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Weight</label>
                <input
                  type="text"
                  name="weight"
                  placeholder="e.g. 28 kg"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-divider" />

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Tell potential owners about this dog's personality, habits, and what makes them special..."
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="dog-form-spinner" /> Adding...
                </>
              ) : (
                <>
                  🐾 &nbsp; Add Dog
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}