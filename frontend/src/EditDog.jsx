import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DogForm.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Navbar from "./components/Navbar";

export default function EditDog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const geocoderContainerRef = useRef(null);
  const geocoderRef = useRef(null);

  const [dog, setDog] = useState({
    name: "", image: "", title: "",
    breed: "", age: "", weight: "",
    color: "", description: "",
  });

  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [0, 0],
    address: "",
  });

  // Fetch existing dog data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dogs/${id}`)
      .then((res) => {
        setDog(res.data);
        if (res.data.location) {
          setLocation(res.data.location);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Mount geocoder
  useEffect(() => {
    if (!geocoderContainerRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
      placeholder: "Search to update location...",
      types: "place,address",
    });

    geocoder.addTo(geocoderContainerRef.current);
    geocoderRef.current = geocoder;

    geocoder.on("result", (e) => {
      const [lng, lat] = e.result.center;
      setLocation({
        type: "Point",
        coordinates: [lng, lat],
        address: e.result.place_name,
      });
    });

    geocoder.on("clear", () => {
      setLocation({ type: "Point", coordinates: [0, 0], address: "" });
    });

    return () => geocoder.onRemove();
  }, []);

  const handleChange = (e) => {
    setDog({ ...dog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/dogs/${id}`,
        { ...dog, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/dogs/${id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dog-form-container">
        <h2>Edit <span>Dog</span></h2>
        <p>Update the details below to keep the listing accurate and up to date.</p>

        <div className="dog-form-card">
          <form className="dog-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Dog Name</label>
              <input
                type="text"
                name="name"
                value={dog.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={dog.image}
                onChange={handleChange}
                required
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

            <div className="form-divider" />

            <div className="form-row">
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
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  value={dog.color}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
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
            </div>

            <div className="form-divider" />

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={dog.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-divider" />

            {/* Location Geocoder */}
            <div className="form-group">
              <label>📍 Location</label>
              {location.address && (
                <p className="geocoder-current">
                  📌 Current: {location.address}
                </p>
              )}
              <div ref={geocoderContainerRef} className="geocoder-wrapper" />
              <p className="geocoder-hint">Search above to change the location</p>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <><span className="dog-form-spinner" /> Saving...</>
              ) : (
                <>✏️ &nbsp; Update Dog</>
              )}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}