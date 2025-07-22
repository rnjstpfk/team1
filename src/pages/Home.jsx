import React from 'react';
import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Home = () => {
    return (
        <div className="home">
            <img
                src={`${process.env.PUBLIC_URL}/img/home.png`}
                alt="홈 사진"
                className="home-img"
            />
            <h1>
                Alexandre Brun – <br />
                View of the Salon Carré <br />
                <span className="underline">at the Louvre</span>
            </h1>


            {/* ✅ Swiper 영역 */}
            <div className="swiper-container">
                <Swiper spaceBetween={20} slidesPerView={2} loop={true}>
                    <SwiperSlide>
                        <div className="slide-card">
                            <img src={`${process.env.PUBLIC_URL}/img/home_swiper1.png`} alt="슬라이드 1" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-card">
                            <img src={`${process.env.PUBLIC_URL}/img/home_swiper2.png`} alt="슬라이드 2" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-card">
                            <img src={`${process.env.PUBLIC_URL}/img/home_swiper3.png`} alt="슬라이드 3" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-card">
                            <img src={`${process.env.PUBLIC_URL}/img/home_swiper4.png`} alt="슬라이드 4" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
};

export default Home;
