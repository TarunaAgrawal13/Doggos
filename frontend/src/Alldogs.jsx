import Dogcard from "./dogcard";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Alldogs.css";

export default function Alldogs() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dogs`)
      .then((res) => {
        setDogs(res.data);
      })
      .catch((err) => console.log("ERROR:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="alldogs-loading">
        <div className="alldogs-loading__spinner" />
        <p>Fetching dogs...</p>
      </div>
    );
  }

  if (!dogs.length) {
    return (
      <div className="alldogs-empty">
        <span className="alldogs-empty__icon">🐾</span>
        <h3>No dogs listed yet</h3>
        <p>Be the first to add a furry friend!</p>
      </div>
    );
  }

  return (
    <div className="alldogs-grid">
      {dogs.map((dog) => (
        <div className="alldogs-grid__item" key={dog._id}>
          <Dogcard {...dog} />
        </div>
      ))}
    </div>
  );
}