import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DogDetails() {
  const { id } = useParams();
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

  return (
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.image} width="400" />
      <p>{dog.title}</p>
    </div>
  );
}