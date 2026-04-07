import './Dogcard.css';
import { useNavigate } from "react-router-dom";

export default function Dogcard({ _id, name, image, title }) {
  const navigate = useNavigate();

  return (
    <div className="dogcard" onClick={() => navigate(`/dogs/${_id}`)}>
      <div className="dogcard__media">
        <img className="dogcard__img" src={image} alt={name} />
      </div>

      <div className="dogcard__body">
        <h3 className="dogcard__name">{name}</h3>
        <p className="dogcard__title">{title}</p>
      </div>

      <div className="dogcard__footer">
        <button
          className="dogcard__btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/dogs/${_id}`); }}
        >
          See More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}