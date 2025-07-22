import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import './Header.scss';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false); // 🔁 로그인/회원가입 전환

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleLogin = () => {
        setLoginOpen((prev) => !prev);
        setIsSignup(false); // 초기에는 로그인 화면
    };
    //검색
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState(''); // ✅ 검색어 상태 추가
    const toggleSearch = () => setSearchOpen(prev => !prev);
    const clearSearch = () => setSearchText(''); // ✅ 글자 지우기용 함수


    // 스크롤 막기
    useEffect(() => {
        if (menuOpen || loginOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen, loginOpen]);

    return (
        <>
            <header className="header">
                <div className="header-left" onClick={toggleMenu}>
                    <img src="/img/logo.png" alt="로고" className="logo" />
                </div>

                <div className="header-center">
                    <Link to="/" className="site-title">
                        <h1>Archive Musée</h1>
                    </Link>
                </div>

                <div className="header-right">
                    <button title="회원가입" className="icon-button" onClick={toggleLogin}>
                        <IoPerson className="icon" />
                    </button>
                    <button title="검색" className="icon-button" onClick={toggleSearch}>
                        <FaSearch className="icon" />
                    </button>

                </div>
            </header>
            {/* 검색창 */}
            {searchOpen && (
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="search"
                        value={searchText} // ✅ 상태 적용
                        onChange={(e) => setSearchText(e.target.value)} // ✅ 상태 업데이트
                    />
                    <button className="search-close" onClick={clearSearch}>×</button> {/* ✅ 글자만 지움 */}
                </div>
            )}




            {/* 메뉴 오버레이 */}
            {menuOpen && (
                <div className="menu-overlay">
                    <button className="close-button" onClick={toggleMenu}>×</button>
                    <div className="menu-content">
                        <ul className="menu-list">
                            <li>MUSEUMS
                                <ul>
                                    <li><Link to="/louvre">루브르 (LOUVRE)</Link></li>
                                    <li><Link to="/british">대영 박물관 (BRITISH)</Link></li>
                                    <li><Link to="/ERMITAGE">에르미타주 박물관</Link></li>
                                    <li><Link to="/VATICAN">바티칸 박물관</Link></li>
                                    <li><Link to="/MET">메트로폴리탄 미술관 (THE MET)</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/exhibitions">특별전시(EXHIBITIONS)</Link></li>
                            <li><Link to="/education">교육 및 자료 (EDUCATION & RESOURCES)</Link></li>
                        </ul>
                        <div className="menu-bottom">
                            <Link to="/about">ABOUT</Link>
                        </div>
                    </div>
                </div>
            )}

            {/* 로그인/회원가입 패널 */}
            {loginOpen && (
                <div className="login-panel">
                    <button className="close-button" onClick={toggleLogin}>×</button>
                    <h2>{isSignup ? 'SIGN UP' : 'LOG IN'}</h2>
                    <form>
                        <input type="text" placeholder="ID" />
                        <input type="password" placeholder="Password" />

                        {isSignup && (
                            <>
                                <input type="password" placeholder="Confirm Password" />
                                <input type="tel" placeholder="Phone Number" />
                            </>
                        )}

                        <button type="submit">{isSignup ? '회원가입' : '로그인'}</button>
                    </form>

                    {/* 소셜 로그인 아이콘 (로그인일 때만 보여짐) */}
                    {!isSignup && (
                        <div className="social-login">
                            <p>SNS 로그인</p>
                            <div className="sns-icons">
                                <a href="#"><img src="/img/instagram.png" alt="Instagram" /></a>
                                <a href="#"><img src="/img/facebook.png" alt="Facebook" /></a>
                                <a href="#"><img src="/img/google.png" alt="Google" /></a>
                            </div>
                        </div>
                    )}

                    <div className="switch-auth">
                        {isSignup ? (
                            <p>
                                이미 계정이 있으신가요?{' '}
                                <button onClick={() => setIsSignup(false)}>로그인</button>
                            </p>
                        ) : (
                            <p>
                                계정이 없으신가요?{' '}
                                <button onClick={() => setIsSignup(true)}>회원가입</button>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
