import React from 'react';
import './BritishMuseum.scss';

const BritishMuseum = () => {
  return (
    <div className="main1">
      <div className="video-container1">
        <iframe
          className="main-video"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/r0UdSk08vQo?autoplay=1&mute=1&loop=1&playlist=r0UdSk08vQo"
          title="We found French Underwear in an Ancient Sumerian City"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        {/* <div className="video-overlay-text">
          <h1>Curator's Corner – British Museum</h1>
        </div> */}
      </div>
    </div>
  );
};

export default BritishMuseum;
