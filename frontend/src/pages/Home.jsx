import "./Home.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

const DOGS = [
  {
    img: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&auto=format&fit=crop&q=80",
    breed: "Golden Retriever",
    tag: "Playful & Loving",
  },
  {
    img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80",
    breed: "German Shepherd",
    tag: "Loyal & Protective",
  },
  {
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80",
    breed: "Labrador",
    tag: "Gentle & Energetic",
  },
  {
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&auto=format&fit=crop&q=80",
    breed: "Border Collie",
    tag: "Smart & Spirited",
  },
  {
    img: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&auto=format&fit=crop&q=80",
    breed: "Beagle",
    tag: "Curious & Merry",
  },
  {
    img: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&auto=format&fit=crop&q=80",
    breed: "Husky",
    tag: "Bold & Adventurous",
  },
];

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef            = useRef(null);
  const CARD_W              = 300;

  /* auto-advance — runs every 2.5s, resets when paused */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setOffset((o) => (o <= 0 ? DOGS.length - 1 : o - 1));
    }, 2500);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setOffset((o) => (o <= 0 ? DOGS.length - 1 : o - 1));
  const next = () => setOffset((o) => (o >= DOGS.length - 1 ? 0 : o + 1));

  return (
    <>
      <Navbar />

      {/* ══ HERO — full width text ══ */}
      <section className="hp-hero">
        <div className="hp-hero__inner">

          <div className="hp-hero__eyebrow">
            <span className="hp-hero__eline" />
            <span>Premium Dog Adoption Platform</span>
            <span className="hp-hero__eline" />
          </div>

          <h1 className="hp-hero__title">
            <span className="hp-hero__t1">Excellence in</span>
            <span className="hp-hero__t2">Every Breed</span>
            <span className="hp-hero__t3">Loyalty in Every Heart</span>
          </h1>

          <p className="hp-hero__sub">
            Your Journey to Forever Friendship Starts Here
          </p>

          <p className="hp-hero__desc">
            At our home of happy paws, we believe a dog is not just a pet but a lifelong
            companion who fills your world with unconditional love, endless loyalty, and
            unforgettable moments. From playful puppies to noble guardians, every breed
            carries a unique spirit waiting to become part of your story.
          </p>

          <div className="hp-hero__actions">
            <Link to="/dogs" className="hp-btn hp-btn--gold">
              Make Your Funny Friend
            </Link>
            <Link to="/dogs" className="hp-btn hp-btn--ghost">
              Browse All Dogs
            </Link>
          </div>

        </div>

        {/* ── CARD CAROUSEL ── */}
        <div
          className="hp-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev / Next */}
          <button className="hp-carousel__arrow hp-carousel__arrow--prev" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="hp-carousel__arrow hp-carousel__arrow--next" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Track */}
          <div className="hp-carousel__viewport">
            <div
              className="hp-carousel__track"
              ref={trackRef}
              style={{ transform: `translateX(calc(-${offset * CARD_W}px))` }}
            >
              {DOGS.map((dog, i) => (
                <div
                  key={i}
                  className={`hp-card ${i === offset ? "hp-card--active" : ""}`}
                >
                  <div className="hp-card__img-wrap">
                    <img src={dog.img} alt={dog.breed} className="hp-card__img" />
                    <div className="hp-card__overlay" />
                    <span className="hp-card__tag">{dog.tag}</span>
                  </div>
                  <div className="hp-card__body">
                    <p className="hp-card__breed">{dog.breed}</p>
                    <Link to="/dogs" className="hp-card__link">
                      View Dogs →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="hp-carousel__dots">
            {DOGS.map((_, i) => (
              <button
                key={i}
                className={`hp-carousel__dot ${i === offset ? "active" : ""}`}
                onClick={() => setOffset(i)}
                aria-label={`Go to ${DOGS[i].breed}`}
              />
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="hp-hero__stats">
          {[
            { num: "10k+", label: "Happy Families"   },
            { num: "200+", label: "Breeds Available" },
            { num: "98%",  label: "Satisfaction"     },
            { num: "5★",   label: "Average Rating"   },
          ].map(({ num, label }, i) => (
            <div className="hp-hero__stat" key={label}>
              {i > 0 && <div className="hp-hero__stat-sep" />}
              <div>
                <div className="hp-hero__stat-num">{num}</div>
                <div className="hp-hero__stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ══ TICKER ══ */}
      <div className="hp-ticker">
        <div className="hp-ticker__track">
          {Array(3).fill([
            "Excellence in Every Breed",
            "Loyalty in Every Heart",
            "Forever Families",
            "Trusted by Thousands",
            "200+ Breeds",
            "Lifetime Support",
          ]).flat().map((t, i) => (
            <span key={i} className="hp-ticker__item">
              {t} <span className="hp-ticker__sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ PROMISE SECTION ══ */}
      <section className="hp-promise">
        <div className="hp-promise__inner">

          <div className="hp-promise__gallery">
            <div className="hp-promise__img-main">
              <img
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&auto=format&fit=crop&q=80"
                alt="Happy dog"
              />
            </div>
            <div className="hp-promise__img-side">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop&q=80"
                alt="Dog portrait"
              />
            </div>
            <div className="hp-promise__gallery-badge">
              <span>🏆</span>
              <div>
                <strong>Top Rated</strong>
                <small>10,000+ families</small>
              </div>
            </div>
          </div>

          <div className="hp-promise__content">
            <div className="hp-promise__tag">
              <span>01</span>
              <div className="hp-promise__tag-line" />
              <span>Our Promise</span>
            </div>

            <h2 className="hp-promise__title">
              Discover<br />
              Companionship<br />
              <em>Like Never Before</em>
            </h2>

            <p className="hp-promise__lead">
              A Bond Built on Trust, Love &amp; Loyalty
            </p>

            <p className="hp-promise__desc">
              Welcome to a world where wagging tails and joyful barks create
              unforgettable memories. We believe every dog carries a heart full
              of devotion, ready to bring warmth and happiness into your life.
              Whether you're looking for an energetic adventure partner or a
              gentle cuddle companion, your forever friend is waiting right here.
              Step into a place where love is unconditional, loyalty is endless,
              and every day begins with a happy bark.
            </p>

            <ul className="hp-promise__list">
              {[
                "Every dog is health-checked and vaccinated",
                "Matched to your lifestyle & family needs",
                "Dedicated post-adoption support team",
                "Meet & greet before any commitment",
              ].map((item) => (
                <li key={item}>
                  <span className="hp-promise__list-icon">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/dogs" className="hp-btn hp-btn--dark">
              Find Your Loyal Companion &nbsp;→
            </Link>
          </div>

        </div>
      </section>

      {/* ══ IMAGE BREAK ══ */}
      <div className="hp-imgbreak">
        <img
          src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=1800&auto=format&fit=crop&q=80"
          alt="Dog and owner"
        />
        <div className="hp-imgbreak__overlay">
          <blockquote className="hp-imgbreak__quote">
            "Because the best memories have four paws — and life is simply
            better with a wagging tail by your side."
          </blockquote>
          <Link to="/dogs" className="hp-btn hp-btn--gold">
            Browse All Dogs
          </Link>
        </div>
      </div>
    </>
  );
}