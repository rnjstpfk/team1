import React from 'react';
import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
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
                Archive Musée –  <br />
                An archive of timeless <br />
                <span className="underline">masterpieces</span>
            </h1>
            <p>03164  서울 종로구 종로2가 9  COPYRIGHT ⓒ 2025 Archive Musée. ALL RIGHTS RESERVED.</p>


            {/* ✅ Swiper 영역 */}
            <div className="swiper-container">
                <Swiper
                    spaceBetween={100}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
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
