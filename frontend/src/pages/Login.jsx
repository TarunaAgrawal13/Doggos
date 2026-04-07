import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dogs";
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Left panel */}
      <div className="auth-panel">
        <div className="auth-panel__logo">
          <Link to="/" className="auth-logo">
            <div className="auth-logo__icon">🐶</div>
            <span className="auth-logo__text">PawConnect</span>
          </Link>
        </div>

        <div className="auth-panel__body">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to your PawConnect account</p>

          {error && (
            <div className="auth-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email address</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <><span className="auth-spinner" /> Signing in...</>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">Create one →</Link>
          </p>
        </div>
      </div>

      {/* Right decorative panel */}
      <div className="auth-visual">
        <div className="auth-visual__orb auth-visual__orb--1" />
        <div className="auth-visual__orb auth-visual__orb--2" />
        <div className="auth-visual__content">
          <div className="auth-visual__quote">
            "Because the best memories have four paws."
          </div>
          <div className="auth-visual__cards">
            {[
              { emoji: "🐕", name: "Bruno", breed: "Golden Retriever" },
              { emoji: "🐩", name: "Luna",  breed: "Poodle" },
              { emoji: "🐾", name: "Max",   breed: "Labrador" },
            ].map((d) => (
              <div className="auth-visual__card" key={d.name}>
                <span className="auth-visual__card-emoji">{d.emoji}</span>
                <div>
                  <strong>{d.name}</strong>
                  <span>{d.breed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}