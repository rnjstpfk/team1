import './Ermitage.scss';
import { ermitageArtworks } from '../data/ermitageArtworks';
import { Link } from 'react-router-dom';
import LikeButton from "../components/LikeButton";

const Ermitage = () => {
    return (
        <div className="ermitage">
            <div className="video-container">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/IhoVSzEGIcM"
                    title="Ermitage Museum Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <div className="video-overlay-text">
                    <h1>The State Hermitage Museum</h1>
                </div>
            </div>

            <div className="main_section">
                <section className="gallery">
                    {ermitageArtworks.map((art) => (
                        <Link
                            to={`/ermitage/artwork/${art.id}`}
                            state={{ from: "/ermitage" }}
                            key={art.id}
                            className="galleryItem"
                        >
                            <div className="image-wrapper">
                                <LikeButton artworkId={`ermitage-${art.id}`} />
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

export default Ermitage;
