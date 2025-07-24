import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import './Header.scss';




const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const menuRef = useRef();
    const loginRef = useRef();
    const searchRef = useRef();

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleLogin = () => {
        setLoginOpen((prev) => !prev);
        setIsSignup(false);
    };
    const toggleSearch = () => setSearchOpen(prev => !prev);
    const clearSearch = () => setSearchText('');
    //모달
    const [aboutOpen, setAboutOpen] = useState(false);
    //메뉴 자동 닫힘
    const handleMenuLinkClick = () => {
        setMenuOpen(false);
        window.scrollTo(0, 0); // ⬅ 페이지 이동 후 스크롤 맨 위로
    };
    //about
    const openAboutModal = () => {
        setAboutOpen(true);
        setMenuOpen(false);
    };

    const searchButtonRef = useRef();



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

    useEffect(() => {
        const handleClickOutside = (e) => {
            const isInsideSearch = searchRef.current && searchRef.current.contains(e.target);
            const isSearchButton = searchButtonRef.current && searchButtonRef.current.contains(e.target);

            if (searchOpen && !isInsideSearch && !isSearchButton) {
                setSearchOpen(false);
            }

            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }

            if (loginOpen && loginRef.current && !loginRef.current.contains(e.target)) {
                setLoginOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen, loginOpen, searchOpen]);


    return (
        <>
            <header className="header">
                <div className="header-left" onClick={toggleMenu}>
                    <img src="/img/logo.png" alt="로고" className="logo" />
                </div>
                <div className="header-center">
                    <Link to="/" className="site-title">
                        <img src="/img/logo1.png" alt="logo" />
                    </Link>
                </div>
                <div className="header-right">
                    <button title="회원가입" className="icon-button" onClick={toggleLogin}>
                        <IoPerson className="icon" />
                    </button>
                    <button title="검색" className="icon-button" onClick={toggleSearch} ref={searchButtonRef} >
                        <FaSearch className="icon" />
                    </button>
                </div>
            </header>

            {searchOpen && (
                <div className="search-bar" ref={searchRef}>
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="search-close" onClick={clearSearch}>×</button>
                </div>
            )}
            {/* 메뉴 */}
            {menuOpen && (
                <div className="menu-overlay" ref={menuRef}>
                    <button className="close-button" onClick={toggleMenu}>×</button>
                    <div className="menu-content">
                        <ul className="menu-list">
                            <li>MUSEUMS
                                <ul>
                                    <li><Link to="/louvre" onClick={handleMenuLinkClick}>루브르 (LOUVRE)</Link></li>
                                    <li><Link to="/british" onClick={handleMenuLinkClick}>대영 박물관 (BRITISH)</Link></li>
                                    <li><Link to="/ermitage" onClick={handleMenuLinkClick}>에르미타주 박물관</Link></li>
                                    <li><Link to="/VATICAN" onClick={handleMenuLinkClick}>바티칸 박물관</Link></li>
                                    <li><Link to="/MET" onClick={handleMenuLinkClick}>메트로폴리탄 미술관 (THE MET)</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/exhibitions" onClick={handleMenuLinkClick}>특별전시(EXHIBITIONS)</Link></li>
                            <li><Link to="/education" onClick={handleMenuLinkClick}>교육 및 자료 (EDUCATION & RESOURCES)</Link></li>
                        </ul>
                        <div className="menu-bottom">
                            <button onClick={openAboutModal}>ABOUT</button>

                        </div>

                    </div>
                </div>
            )}
            {/* 회원가입 */}
            {loginOpen && (
                <div className="login-panel" ref={loginRef}>
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
                            <p>이미 계정이 있으신가요? <button onClick={() => setIsSignup(false)}>로그인</button></p>
                        ) : (
                            <p>계정이 없으신가요? <button onClick={() => setIsSignup(true)}>회원가입</button></p>
                        )}
                    </div>
                </div>
            )}

            {/* 모달 */}
            {aboutOpen && (
                <div className="about-modal">

                    <div className="about-page">
                        <button className="close-button" onClick={() => setAboutOpen(false)}>×</button>
                        <div className="about-header">
                            <h1>ABOUT</h1>
                        </div>

                        <div className="about-content">
                            <div className="about-image">
                                <img src="/img/about-image.png" alt="About Archive Musee" />
                            </div>
                            <div className="about-text">
                                <p>
                                    Archive Musée는 세계 유수의 박물관에서 엄선한 명작들을 모아놓은 디지털 아카이브입니다.<br />
                                    우리의 사명은 누구나 언제 어디서나 인류의 시각적 역사를 탐색하고, 감상하고,<br />
                                    배우도록 예술과 문화유산에 대한 열린 접근을 제공하는 것입니다.<br />
                                    우리는 예술이 시간과 국경을 초월하는 보편적 언어라 믿습니다.<br />
                                    여러분이 단순한 관람자도, 학생이어도, 예술 애호가든<br />
                                    Archive Musée는 전 세계의 위대한 컬렉션을 한곳에서 접할 수 있는 관문이 될 것입니다.
                                </p>
                                <p className="en">
                                    Archive Musée is a digital archive of masterpieces<br />
                                    from the world’s leading museums.<br />
                                    We provide open access to art and cultural heritage,<br />
                                    allowing users to explore and learn from humanity’s visual history — anytime, anywhere.<br />
                                    Art transcends time and borders, and through this platform,<br />
                                    we make significant artworks more accessible to all.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Header;
