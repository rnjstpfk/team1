import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { louvreArtworks } from '../data/louvreArtworks';
import { britishArtworks } from '../data/britishArtworks';
import { vaticanArtworks } from '../data/vaticanArtworks';
import { metArtworks } from '../data/metArtworks';
import { ermitageArtworks } from '../data/ermitageArtworks';
import './ArtworkDetail.scss';

const ArtworkDetail = () => {
  const { id, museum } = useParams();
  const location = useLocation();
  const backPath = location.state?.from || '/';

  // ✅ museum 값에 따라 데이터 선택
  let artworksData = [];
  if (museum === 'louvre') artworksData = louvreArtworks;
  else if (museum === 'british') artworksData = britishArtworks;
  else if (museum === 'vatican') artworksData = vaticanArtworks;
  else if (museum === 'met') artworksData = metArtworks;
  else if (museum === 'ermitage') artworksData = ermitageArtworks;

  const artwork = artworksData.find((item) => item.id === Number(id));
  if (!artwork) return <h2>작품을 찾을 수 없습니다.</h2>;

  // ✅ 헬퍼: 값이 문자열이어도 배열로 변환
  const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  // ✅ 필드명/형식 차이 대응 (fallback)
  const detailText =
    artwork.detail ??
    artwork.description ??
    artwork.desc ??
    '';

  const descList = toArray(
    artwork.descriptions ??
    artwork.descriptionList ??
    artwork.description ??
    artwork.desc
  );

  const storyList = toArray(
    artwork.story ??
    artwork.stories ??
    artwork.storytext
  );

  return (
    <div className="detail-page">
      <Link to={backPath}>← 뒤로가기</Link>
      <h1>{artwork.title}</h1>

      {/* ✅ 공통 메인 이미지 (중복 제거) */}
      <div className="art-main-img">
        <img src={artwork.image} alt={artwork.title} />
      </div>

      {/* ✅ detail: 단일 문자열도 안전하게 */}
      {detailText && <p className="art-detail">{detailText}</p>}

      {/* ✅ descriptions: 문자열/배열 모두 대응 */}
      {descList.length > 0 && (
        <div className="art-desc">
          {descList.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
        </div>
      )}

      {/* ✅ 루브르 특수 케이스 유지 */}
      {museum === 'louvre' && artwork.id === 0 && artwork.img1 && (
        <div className="art-img1">
          <img src={artwork.img1} alt="설명이미지" />
        </div>
      )}

      {artwork.storytit && <p className="art-story-tit">{artwork.storytit}</p>}

      {storyList.length > 0 && (
        <div className="art-story">
          {storyList.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      )}

      {museum === 'louvre' && artwork.id === 4 && artwork.img2 && (
        <div className="art-img2">
          <img src={artwork.img2} alt="설명이미지" />
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
