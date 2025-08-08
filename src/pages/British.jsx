import './British.scss';
import { britishArtworks } from '../data/britishArtworks';
import { Link } from 'react-router-dom';
import LikeButton from "../components/LikeButton";

const British = () => {
    return (
        <div className="british">
            <div className="video-container">
                <video
                    src="https://bmwebsitestreaming.blob.core.windows.net/bmvideo/Tour_of_the_British_Museum.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="video-overlay-text">
                    <h1>The British Museum</h1>
                </div>
            </div>

            <div className="main_section">
                <section className="gallery">
                    {britishArtworks.map((art) => (
                        <Link
                            to={`/british/artwork/${art.id}`}
                            state={{ from: "/british" }}
                            key={art.id}
                            className="galleryItem"
                        >
                            {/* ✅ 이미지 래퍼 안에 하트 + 이미지 */}
                            <div className="image-wrapper">
                                <LikeButton artworkId={`british-${art.id}`} />
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

export default British;
