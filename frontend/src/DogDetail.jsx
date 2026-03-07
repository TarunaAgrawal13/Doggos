import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DogDetail.css";

export default function DogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/dogs/${id}`)
      .then((res) => {
        setDog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!dog) return <h2>Loading...</h2>;

  //for delete

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/dogs/${id}`);
      alert("Dog deleted successfully 🐶");
      navigate("/dogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dog-page">
      <div className="dog-card">
        <h1 className="dog-name">{dog.name}</h1>

        <img src={dog.image} alt={dog.name} className="dog-image" />

        <p className="dog-title">{dog.title}</p>

        <div className="dog-info">
          <p>
            <b>Breed:</b> {dog.breed}
          </p>
          <p>
            <b>Age:</b> {dog.age}
          </p>
          <p>
            <b>Weight:</b> {dog.weight}
          </p>
          <p>
            <b>Color:</b> {dog.color}
          </p>
        </div>

        <p className="dog-description">{dog.description}</p>

        <div>
          <button onClick={handleDelete} className="btn-dark">
            Delete Dog
          </button>
           &nbsp; &nbsp;
          <button className="btn-dark" onClick={() => navigate(`/edit-dog/${id}`)}>
            Edit Dog 
          </button>
        </div>

      </div>
    </div>
  );
}
