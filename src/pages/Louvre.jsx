import './Louvre.scss';
import { louvreArtworks } from '../data/louvreArtworks';
import { Link } from 'react-router-dom';
import LikeButton from "../components/LikeButton"; // 상단에 추가


const Louvre = () => {
  return (
    <div className="louvre">
      <div className="video-container">
        <video
          className="main-video"
          src="https://api-www.louvre.fr/sites/default/files/2024-04/cover-w1920-h600-scaled.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-overlay-text">
          <h1>Réservation obligatoire - Été 2025</h1>
        </div>
      </div>

      <div className="main_section">
        <section className="gallery">
          {louvreArtworks.map((art) => (
            <Link
              to={`/louvre/artwork/${art.id}`}
              state={{ from: "/louvre" }}
              key={art.id}
              className="galleryItem"
            >
              {/* 👇 추가 */}
              <div className="image-wrapper">
                <LikeButton artworkId={`louvre-${art.id}`} />
                <img src={art.image} alt={art.title} />
              </div>

              <h3>{art.title}</h3>
              <p>{art.info}</p>
            </Link>

          ))}
        </section>
      </div>
    </div>
  );
};

export default Louvre;
