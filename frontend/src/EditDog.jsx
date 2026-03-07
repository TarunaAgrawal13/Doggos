import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DogForm.css";

export default function EditDog() {
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/dogs/${id}`)
      .then((res) => {
        setDog(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setDog({
      ...dog,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/dogs/${id}`, dog);
      alert("Dog updated successfully 🐶");
      navigate(`/dogs/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dog-form-container">
      <h2>Edit Dog</h2>

      <form className="dog-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Dog Name</label>
          <input
            type="text"
            name="name"
            value={dog.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={dog.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={dog.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Breed</label>
          <input
            type="text"
            name="breed"
            value={dog.breed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={dog.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input
            type="text"
            name="weight"
            value={dog.weight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={dog.color}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={dog.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Dog</button>

      </form>
    </div>
  );
}