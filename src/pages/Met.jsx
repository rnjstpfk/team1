import './Met.scss';
import { metArtworks } from '../data/metArtworks.js';
import { Link } from 'react-router-dom';

const Met = () => {
    return (
        <div className="met">
            <div className="video-container">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/여기에_메트_영상_URL"
                    title="Metropolitan Museum of Art Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <div className="video-overlay-text">
                    <h1>The Met - 2025</h1>
                </div>
            </div>

            <div className="main_section">
                <section className="gallery">
                    {metArtworks.map((art) => (
                        <Link
                            to={`/met/artwork/${art.id}`}   // ✅ URL에 museum 포함
                            state={{ from: "/met" }}        // ✅ 뒤로가기 시 /met으로 이동
                            key={art.id}
                            className="galleryItem"
                        >
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

export default Met;
