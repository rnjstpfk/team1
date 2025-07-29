import './SearchResults.scss';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { louvreArtworks } from '../data/louvreArtworks';
import { britishArtworks } from '../data/britishArtworks';
import { metArtworks } from '../data/metArtworks';
import { vaticanArtworks } from '../data/vaticanArtworks';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query') || '';

  // ✅ 전체 데이터 합치기
  const allArtworks = [
    ...louvreArtworks,
    ...britishArtworks,
    ...metArtworks,
    ...vaticanArtworks
  ];

  // ✅ 검색어 필터링
  const filtered = allArtworks.filter((art) =>
    art.title.toLowerCase().includes(query.toLowerCase()) ||
    art.info.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-results">
      {/* ✅ 뒤로가기 버튼 */}
      <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>

      <h2>🔍 "{query}" 검색 결과</h2>

      {filtered.length > 0 ? (
        <div className="gallery">
          {filtered.map((art) => (
            <Link to={`/artwork/${art.id}`} key={art.id} className="galleryItem">
              <img src={art.image} alt={art.title} />
              <h3>{art.title}</h3>
              <p>{art.info}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-results">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResults;
