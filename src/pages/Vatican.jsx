import './Vatican.scss';
import { vaticanArtworks } from '../data/vaticanArtworks';
import { Link } from 'react-router-dom';

const Vatican = () => {
    return (
        <div className="vatican">
            <div className="vatican_banner">
                <img
                    src="https://www.museivaticani.va/content/dam/museivaticani/immagini/home/02_collezioni.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
                    alt="Vatican Museum"
                />
                <div className="img_overlay_text">
                    <h1>MVSEI VATICAN</h1>
                </div>
            </div>

            <div className="main_section">
                <section className="gallery">
                    {vaticanArtworks.map((art) => (
                        <Link
                            to={`/vatican/artwork/${art.id}`}   // ✅ museum 이름 포함된 경로
                            state={{ from: "/vatican" }}        // ✅ 뒤로가기 시 사용할 경로
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

export default Vatican;
