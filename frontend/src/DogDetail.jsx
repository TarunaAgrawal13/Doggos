import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./DogDetail.css";
import Navbar from "./components/Navbar";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function DogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

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
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/dogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dogs");
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!dog || !mapContainerRef.current) return;

    const coords = dog?.location?.coordinates;
    if (!coords || (coords[0] === 0 && coords[1] === 0)) return;

    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: coords,
      zoom: 13,
    });

    new mapboxgl.Marker({ color: "#ff6b6b" })
      .setLngLat(coords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${dog.name}</strong><br/>${dog.location?.address || ""}`
        )
      )
      .addTo(mapRef.current);

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [dog]);

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

  const hasLocation =
    dog?.location?.coordinates &&
    !(dog.location.coordinates[0] === 0 && dog.location.coordinates[1] === 0);

  return (
    <>
      <Navbar />
      <div className="dog-page">
        <div className="dog-page__inner">

          {/* Breadcrumb */}
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

          {/* Main layout */}
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

              {/* Map */}
              <div className="dog-map-section">
                <p className="dog-desc__label">📍 Location</p>
                {hasLocation ? (
                  <>
                    {dog.location.address && (
                      <p className="dog-map-address">{dog.location.address}</p>
                    )}
                    <div ref={mapContainerRef} className="dog-map" />
                  </>
                ) : (
                  <p className="dog-map-empty">No location set for this dog.</p>
                )}
              </div>

              {/* Actions */}
              <div className="dog-actions">
                <button
                  className="dog-btn dog-btn--edit"
                  onClick={() => navigate(`/edit-dog/${id}`)}
                >
                  Edit Dog
                </button>
                <button
                  className="dog-btn dog-btn--delete"
                  onClick={handleDelete}
                  disabled={deleting}
                >
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