import './Louvre.scss';
import { louvreArtworks } from '../data/louvreArtworks';
import { Link } from 'react-router-dom';

const Louvre = () => {
    return (
        <div className="louvre">
            <div className="video-container">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r0UdSk08vQo" title="We found French Underwear in an Ancient Sumerian City | Girsu Project | Curator&#39;s Corner S10 Ep4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className="video-overlay-text">
                    <h1>Réservation obligatoire - Été 2025</h1>
                </div>
            </div>

            <div className="main_section">
                <section className="gallery">
                    {louvreArtworks.map((art) => (
                        <Link to={`/artwork/${art.id}`} key={art.id} className="galleryItem">
                            <img src={art.image} alt={art.title} />
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
