import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./DogRecommender.css";

export default function DogRecommender() {
  const [form, setForm] = useState({
    lifestyle: "",
    space: "",
    experience: "",
    preference: "",
  });

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult([]);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/ai/dog-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          space: form.space,
          activity: form.lifestyle,
          experience: form.experience,
          budget: form.preference,
        }),
      });

      const data = await res.json();

      // If backend sends JSON array
      if (Array.isArray(data.result)) {
        setResult(data.result);
      } else {
        // fallback if AI returns text
        setResult([{ name: "Recommendation", reason: data.result }]);
      }

    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="rec-page">
        <div className="rec-card">

          {/* HEADER */}
          <div className="rec-header">
            <span className="rec-icon">🐾</span>
            <h1 className="rec-title">Find Your Perfect Dog</h1>
            <p className="rec-sub">
              Answer a few questions and AI will suggest the best breed.
            </p>
          </div>

          {/* FORM */}
          <form className="rec-form" onSubmit={handleSubmit}>
            
            <div className="rec-field">
              <label>Your lifestyle</label>
              <select name="lifestyle" onChange={handleChange} required defaultValue="">
                <option value="" disabled>Select your lifestyle</option>
                <option value="active, love outdoor activities">Active / Outdoorsy</option>
                <option value="relaxed, mostly indoors">Relaxed / Homebody</option>
                <option value="busy, not home much">Busy / Rarely home</option>
              </select>
            </div>

            <div className="rec-field">
              <label>Living space</label>
              <select name="space" onChange={handleChange} required defaultValue="">
                <option value="" disabled>Select your space</option>
                <option value="large house with a garden">House with garden</option>
                <option value="medium apartment">Medium apartment</option>
                <option value="small apartment">Small apartment</option>
              </select>
            </div>

            <div className="rec-field">
              <label>Experience with dogs</label>
              <select name="experience" onChange={handleChange} required defaultValue="">
                <option value="" disabled>Select experience</option>
                <option value="first-time owner">First-time owner</option>
                <option value="some experience">Some experience</option>
                <option value="very experienced">Very experienced</option>
              </select>
            </div>

            <div className="rec-field">
              <label>Preference</label>
              <select name="preference" onChange={handleChange} required defaultValue="">
                <option value="" disabled>Select preference</option>
                <option value="small and cuddly">Small & cuddly</option>
                <option value="energetic and playful">Energetic & playful</option>
                <option value="calm and protective">Calm & protective</option>
              </select>
            </div>

            <button type="submit" className="rec-btn" disabled={loading}>
              {loading ? "Finding your match..." : "✨ Recommend Me a Dog"}
            </button>
          </form>

          {/* ERROR */}
          {error && <div className="rec-error">⚠️ {error}</div>}

          {/* RESULT */}
          {result.length > 0 && (
            <div className="rec-result">
              <h3>Your Top Matches</h3>

              <div className="rec-cards">
                {result.map((dog, index) => (
                  <div key={index} className="dog-card">
                    <h4>{dog.name}</h4>
                    <p>{dog.reason}</p>
                  </div>
                ))}
              </div>

              <Link to="/dogs" className="rec-browse">
                Browse available dogs →
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}