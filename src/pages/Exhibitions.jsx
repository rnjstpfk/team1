import './Exhibitions.scss';

import LikeButton from "../components/LikeButton"; // 상단에 추가

// ✅ artworks 데이터만 불러오기
import louvreArtworks from '../data/louvreArtworks';
import britishArtworks from '../data/britishArtworks';
import vaticanArtworks from '../data/vaticanArtworks';
import metArtworks from '../data/metArtworks';


// ✅ 박물관 리스트 구성
const museums = [
  { name: '루브르', key: 'louvre', artworks: louvreArtworks },
  { name: '대영 박물관', key: 'british', artworks: britishArtworks },
  { name: '바티칸', key: 'vatican', artworks: vaticanArtworks },
  { name: '메트로폴리탄', key: 'met', artworks: metArtworks },
];


const Exhibitions = () => {
  return (
    <div className="exhibitions-page wrapper">
      <h1>Education & Resources</h1>
      <div className="exhibitions-museum-list">
        {museums.map(museum => (
          <div key={museum.key} className="museum-row">
            <h2 className="museum-title">{museum.name}</h2>
            <div className="museum-artworks">
              {museum.artworks.map((art, idx) => (
                <div key={idx} className="artwork-item">
                  <img src={art.image} alt={art.title} />
                  <div className="artwork-title">{art.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <img
        className="exhibitions-example"
        src="/img/특별전시페이지1.png"
        alt="특별전시 예시"
        style={{ marginTop: '40px', maxWidth: '100%' }}
      /> */}
    </div>
  );
};

export default Exhibitions;
