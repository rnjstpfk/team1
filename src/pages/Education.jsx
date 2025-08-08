import React, { useState } from 'react';
import './Education.scss';

// 각 박물관별 영상 데이터 (Education 영상코드.txt 기반)
const museums = [
   {
      name: 'LOUVRE MUSEUMS',
      key: 'louvre',
      videos: [
         { title: '1화 Conserver:보존', youtubeId: 'jSJFYhGBhXM' },
         { title: '2화 Restaurer:레스토랑', youtubeId: 'yqL1F-c2HGE' },
         { title: '3화 Exposer:변화', youtubeId: 'TCziZApPAfY' },
         {
            title: "[Coup d'œil] L'entretien de l'escalier Mollien : 기타의견",
            youtubeId: 'Pe4uf98cq_4',
         },
      ],
   },
   {
      name: 'BRITISH MUSEUMS',
      key: 'british',
      videos: [
         { title: '2차 세계대전 당시 서튼 후 보물은 어디에 있었나요?', youtubeId: 'x-026sRzd6w' },
         { title: 'Making beauty: Hosono Hitomi', youtubeId: 'QqQ_Bg0FaeE' },
         { title: 'Tour of the British Museum - Audio Descriptive', youtubeId: '0I0Bl0B_2zA' },
      ],
   },
   {
      name: 'ERMITAGE MUSEUMS',
      key: 'ermitage',
      videos: [
         { title: 'Ландшафт души. Каспар Давид Фридрих и Россия', youtubeId: 'zy24cGdgWm4' },
         { title: 'Эрмитаж в прямом эфире. Галерея Петра Великого', youtubeId: '5KC8nWm5B8I' },
         { title: 'Пасхальный концерт в Большой церкви Зимнего дворца', youtubeId: 'UoZeY_j-lOk' },
         { title: 'Шпалера "Поклонение волхвов". Рассказывает Татьяна Лехович', youtubeId: 'Jn8eJwNaaLA' },
      ],
   },
   {
      name: 'VATICAN MUSEUMS',
      key: 'vatican',
      videos: [
         { title: 'Benvenuti ai Musei Vaticani – Welcome to the Vatican Museums', youtubeId: 'tEECdm3o73I' },
         { title: 'I Musei Vaticani riaprono dopo il lockdown', youtubeId: 'ZewZWdd_x6E' },
         { title: 'Cappella Sistina – Sistine Chapel', youtubeId: 'E75woOZJuNg' },
         { title: 'Museo Gregoriano Egizio – Gregorian Egyptian Museum', youtubeId: 'wheYRUOwQjA' },
      ],
   },
   {
      name: 'THE MET',
      key: 'met',
      videos: [
         { title: '전시 투어—고대 아메리카 미술 | 마이클 C. 록펠러 윙', youtubeId: 'FGdtrRSEOzI' },
         { title: '지금 오픈: 마이클 C. 록펠러 윙의 오세아니아 예술', youtubeId: 'T-kfsuMHeGE' },
         { title: 'Exhibition Preview Conversation—"Superfine: Tailoring Black Style"', youtubeId: 'GHTCGnncwJs' },
      ],
   },
];

const Education = () => {
   // 각 박물관별로 현재 선택된 영상 인덱스 관리
   const [selectedVideos, setSelectedVideos] = useState(museums.map(() => 0));

   const handleSelectVideo = (museumIdx, videoIdx) => {
      setSelectedVideos((prev) => {
         const updated = [...prev];
         updated[museumIdx] = videoIdx;
         return updated;
      });
   };
   return (
     <div className="education-page">
      <h1 className="education-title">EDUCATION</h1>
      <div className="education-museum-list">
        {museums.map((museum, idx) => {
         const selectedIdx = selectedVideos[idx] || 0;
         const selectedVideo = museum.videos[selectedIdx];
         return (
           <section
            key={museum.key}
            className={`museum-section museum-section-${museum.key}`}
           >
            <div className={`museum-row ${idx % 2 === 0 ? 'row-normal' : 'row-reverse'}`}>
              {/* 영상 */}
           <div className="museum-video-box">
            
            <div className="museum-video-outer">
              {selectedVideo && (
               <div className="museum-video-frame">
                 <iframe
                  width="100%"
                  height="340"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                 />
               </div>
              )}
            </div>
           </div>
              {/* 리스트 */}
              <div className="museum-resource-list">
               <div className="museum-name museum-name-above">{museum.name}</div>
               <ul className="museum-resources">
                 {museum.videos.map((video, vIdx) => (
                  <li
                    key={vIdx}
                    className={`resource-item${selectedIdx === vIdx ? ' selected' : ''}`}
                    onClick={() => handleSelectVideo(idx, vIdx)}
                  >
                    {video.title}
                  </li>
                 ))}
               </ul>
              </div>
            </div>
            {idx !== museums.length - 1 && <hr className="museum-divider" />}
           </section>
         );
        })}
      </div>
     </div>
   );
}

export default Education;