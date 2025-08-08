import './Louvre.scss';
import { louvreArtworks } from '../data/louvreArtworks';
import { Link } from 'react-router-dom';
import LikeButton from "../components/LikeButton";

const Louvre = () => {
    return (
        <div className="louvre">
            <div className="video-container">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/IhoVSzEGIcM"
                    title="Louvre Museum Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <div className="video-overlay-text">
                    {/* <h1>Réservation obligatoire - Été 2025</h1> */}
                </div>
            </div>

            <div className="main_section">
                <section className="gallery">
                    {louvreArtworks.map((art) => (
                        <Link
                            to={`/artwork/${art.id}`} 
                            key={art.id}
                            className="galleryItem"
                        >
                            {/* ✅ 하트 + 이미지 */}
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
