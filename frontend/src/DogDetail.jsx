import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DogDetail.css";
import Navbar from "./components/Navbar";

export default function DogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dogs/${id}`)
      .then((res) => setDog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this dog?")) return;
    try {
      setDeleting(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/dogs/${id}`);
      navigate("/dogs");
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  if (!dog) {
    return (
      <>
        <Navbar />
        <div className="dog-loading">
          <div className="dog-loading__spinner" />
          <p>Fetching dog details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dog-page">
        <div className="dog-page__inner">

          {/* ── Breadcrumb ── */}
          <nav className="dog-breadcrumb">
            <button className="dog-breadcrumb__back" onClick={() => navigate("/dogs")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All Dogs
            </button>
            <span className="dog-breadcrumb__sep">/</span>
            <span className="dog-breadcrumb__current">{dog.name}</span>
          </nav>

          {/* ── Main layout ── */}
          <div className="dog-layout">

            {/* Left — image */}
            <div className="dog-media">
              <div className="dog-media__frame">
                <img src={dog.image} alt={dog.name} className="dog-media__img" />
              </div>
            </div>

            {/* Right — details */}
            <div className="dog-details">

              <div className="dog-details__header">
                <h1 className="dog-details__name">{dog.name}</h1>
                <p className="dog-details__title">{dog.title}</p>
              </div>

              {/* Info grid */}
              <div className="dog-info-grid">
                {[
                  { label: "Breed",  value: dog.breed  },
                  { label: "Age",    value: dog.age    },
                  { label: "Weight", value: dog.weight },
                  { label: "Color",  value: dog.color  },
                ].map(({ label, value }) => (
                  <div className="dog-info-grid__item" key={label}>
                    <span className="dog-info-grid__label">{label}</span>
                    <span className="dog-info-grid__value">{value}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              {dog.description && (
                <div className="dog-desc">
                  <p className="dog-desc__label">About</p>
                  <p className="dog-desc__text">{dog.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="dog-actions">
                <button
                  className="dog-btn dog-btn--edit"
                  onClick={() => navigate(`/edit-dog/${id}`)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Dog
                </button>

                <button
                  className="dog-btn dog-btn--delete"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  {deleting ? "Deleting..." : "Delete Dog"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}