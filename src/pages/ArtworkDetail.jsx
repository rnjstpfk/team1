import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { louvreArtworks } from '../data/louvreArtworks';
import { britishArtworks } from '../data/britishArtworks';
import { vaticanArtworks } from '../data/vaticanArtworks'; // ✅ Vatican 데이터 추가
import { metArtworks } from '../data/metArtworks'; // ✅ Vatican 데이터 추가
import './ArtworkDetail.scss';

const ArtworkDetail = () => {
  const { id, museum } = useParams(); // ✅ museum도 URL에서 받음
  const location = useLocation();
  const backPath = location.state?.from || "/";

  // ✅ museum 값에 따라 데이터 선택
  let artworksData;
  if (museum === "louvre") artworksData = louvreArtworks;
  else if (museum === "british") artworksData = britishArtworks;
  else if (museum === "vatican") artworksData = vaticanArtworks;
  else if (museum === "met") artworksData = metArtworks;
  else artworksData = [];

  const artwork = artworksData.find((item) => item.id === parseInt(id));

  if (!artwork) return <h2>작품을 찾을 수 없습니다.</h2>;

  return (
    <div className="detail-page">
      <Link to={backPath}>← 뒤로가기</Link>
      <h1>{artwork.title}</h1>
      <img src={artwork.image} alt={artwork.title} />
      <p>{artwork.description || artwork.info}</p>
    </div>
  );
};

export default ArtworkDetail;
