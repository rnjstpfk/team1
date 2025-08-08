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

  // ✅ 데이터에 museum 태그 추가해서 합치기
  const allArtworks = [
    ...louvreArtworks.map(a => ({ ...a, museum: 'louvre' })),
    ...britishArtworks.map(a => ({ ...a, museum: 'british' })),
    ...metArtworks.map(a => ({ ...a, museum: 'met' })),
    ...vaticanArtworks.map(a => ({ ...a, museum: 'vatican' })),
  ];

  // ✅ 검색어 필터링 (제목/정보)
  const filtered = allArtworks.filter((art) =>
    art.title.toLowerCase().includes(query.toLowerCase()) ||
    art.info.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-results">
      <button className="back-button" onClick={() => navigate('/')}>← 뒤로가기</button>
      <h2>🔍 "{query}" 검색 결과</h2>

      {filtered.length > 0 ? (
        <div className="gallery">
          {filtered.map((art) => (
            <Link
              key={`${art.museum}-${art.id}`}
              to={`/${art.museum}/artwork/${art.id}`}          // ✅ 박물관 포함한 링크
              state={{ from: location.pathname + location.search }} // ✅ 뒤로가기용
              className="galleryItem"
            >
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
