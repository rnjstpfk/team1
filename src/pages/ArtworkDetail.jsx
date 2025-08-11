import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { louvreArtworks } from '../data/louvreArtworks';
import { britishArtworks } from '../data/britishArtworks';
import { vaticanArtworks } from '../data/vaticanArtworks'; // ✅ Vatican 데이터 추가
import { metArtworks } from '../data/metArtworks'; // ✅ metro 데이터 추가
import { ermitageArtworks } from '../data/ermitageArtworks'; // ✅ ermitage 데이터 추가
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
  else if (museum === "ermitage") artworksData = ermitageArtworks;
  else artworksData = [];

  const artwork = artworksData.find((item) => item.id === parseInt(id));

  if (!artwork) return <h2>작품을 찾을 수 없습니다.</h2>;

  return (
    <div className="detail-page">
      <Link to={backPath}>← 뒤로가기</Link>
      <h1>{artwork.title}</h1>
      {museum === "louvre"&& (
        <div className="art-main-img">
          <img src={artwork.image} alt={artwork.title} />
        </div>
      )}
      {museum === "british"&& (
        <div className="art-main-img">
          <img src={artwork.image} alt={artwork.title} />
        </div>
      )}
      {museum === "ermitage"&& (
        <div className="art-main-img">
          <img src={artwork.image} alt={artwork.title} />
        </div>
      )}
      {museum === "vatican"&& (
        <div className="art-main-img">
          <img src={artwork.image} alt={artwork.title} />
        </div>
      )}
      {museum === "met"&& (
        <div className="art-main-img">
          <img src={artwork.image} alt={artwork.title} />
        </div>
      )}
      <p className="art-detail">{artwork.detail}</p>         {/* ✅ text 전용 스타일 */}
      <div className="art-desc">                     {/* ✅ descriptions 전용 스타일 */}
        {artwork.descriptions?.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </div>
      {museum === "louvre" && artwork.id === 0 && (
        <div className="art-img1">
          <img src={artwork.img1} alt="설명이미지" />
        </div>
      )}
      <p className='art-story-tit'>{artwork.storytit}</p>
      {/* <p className='art-story'>{artwork.story}</p> */}
      <div className="art-story">
        {artwork.story?.map((story, i) => (
          <p key={i}>{story}</p>
        ))}
      </div>
      {museum === "louvre" && artwork.id === 4 && (
        <div className="art-img2">
          <img src={artwork.img2} alt="설명이미지" />
        </div>
      )}
      {museum === "british" && artwork.id === 1 && (
        <div className="art-img2">
          <img src={artwork.img3} alt="설명이미지" />
        </div>
      )}
      {museum === "vatican" && artwork.id === 7 && (
        <div className="art-img2">
          <img src={artwork.img4} alt="설명이미지" />
        </div>
      )}
      {museum === "ermitage" && artwork.id === 9 && (
        <div className="art-img1">
          <img src={artwork.img5} alt="설명이미지" />
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
