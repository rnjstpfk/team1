import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './Header.scss';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const [aboutOpen, setAboutOpen] = useState(false);

    const menuRef = useRef();
    const loginRef = useRef();
    const searchRef = useRef();
    const searchButtonRef = useRef();

    const navigate = useNavigate();

    // ✅ Firebase 로그인 상태 감지
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
                if (docSnap.exists()) setUserData(docSnap.data());
            } else {
                setUserData(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // ✅ 메뉴/로그인 모달 열릴 때 스크롤 방지
    useEffect(() => {
        document.body.style.overflow = (menuOpen || loginOpen) ? 'hidden' : 'auto';
    }, [menuOpen, loginOpen]);

    // ✅ 모달/검색창 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchOpen && searchRef.current && !searchRef.current.contains(e.target) && !searchButtonRef.current.contains(e.target)) setSearchOpen(false);
            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
            if (loginOpen && loginRef.current && !loginRef.current.contains(e.target)) setLoginOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen, loginOpen, searchOpen]);

    // ✅ 메뉴/로그인/검색 토글
    const toggleMenu = () => setMenuOpen(prev => !prev);
    const toggleLogin = () => { setLoginOpen(prev => !prev); setIsSignup(false); setAuthError(''); };
    const toggleSearch = () => setSearchOpen(prev => !prev);
    const clearSearch = () => setSearchText('');
    const handleMenuLinkClick = () => { setMenuOpen(false); window.scrollTo(0, 0); };
    const openAboutModal = () => { setAboutOpen(true); setMenuOpen(false); };

    // ✅ Firebase 로그인/회원가입 처리
    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                if (password !== confirmPassword) {
                    setAuthError('❌ 비밀번호가 일치하지 않습니다.');
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;
                await setDoc(doc(db, 'users', newUser.uid), {
                    username,
                    email: newUser.email,
                    createdAt: new Date(),
                });
                setAuthError('');
                setLoginOpen(false);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                setAuthError('');
                setLoginOpen(false);
            }
            setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
        } catch (err) {
            console.error('Firebase Auth Error:', err);
            const code = err.code || '';
            if (code === 'auth/user-not-found') {
                setAuthError('⚠️ 해당 이메일이 없습니다. 회원가입 화면으로 전환합니다.');
                setIsSignup(true);
            } else if (code === 'auth/wrong-password') {
                setAuthError('❌ 비밀번호가 틀렸습니다.');
            } else if (code === 'auth/invalid-credential') {
                setAuthError('❌ 로그인 자격 증명이 유효하지 않습니다.');
            } else if (code === 'auth/email-already-in-use') {
                setAuthError('⚠️ 이미 가입된 이메일입니다. 로그인 해주세요.');
                setIsSignup(false);
            } else if (code === 'auth/invalid-email') {
                setAuthError('❌ 올바른 이메일 형식이 아닙니다.');
            } else {
                setAuthError(`❌ 오류가 발생했습니다: ${err.message}`);
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        alert('🚪 로그아웃 완료');
    };

    // ✅ 검색 기능 (Enter → 이동 + 자동 닫기 + 검색어 초기화)
    const handleSearchKey = (e) => {
        if (e.key === 'Enter' && searchText.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchText)}`);
            setSearchOpen(false);
            clearSearch();
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-left" onClick={toggleMenu}>
                    <img src="/img/logo.png" alt="로고" className="logo" />
                </div>
                <div className="header-center">
                    <Link to="/" className="site-title"><img src="/img/logo1.png" alt="logo" /></Link>
                </div>
                <div className="header-right">
                    {user ? (
                        <>
                            <span className="welcome">{userData?.username} 님</span>
                            <button className="icon-button" onClick={handleLogout}>로그아웃</button>
                        </>
                    ) : (
                        <button title="로그인" className="icon-button" onClick={toggleLogin}>
                            <IoPerson className="icon" />
                        </button>
                    )}
                    <button title="검색" className="icon-button" onClick={toggleSearch} ref={searchButtonRef}><FaSearch className="icon" /></button>
                </div>
            </header>

            {/* 🔍 검색창 */}
            {searchOpen && (
                <div className="search-bar search-open" ref={searchRef}>
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleSearchKey}
                        autoFocus
                    />
                    <button className="search-close" onClick={() => { clearSearch(); setSearchOpen(false); }}>×</button>
                </div>
            )}

            {/* 📌 메뉴 */}
            {menuOpen && (
                <div className="menu-overlay" ref={menuRef}>
                    <button className="close-button" onClick={toggleMenu}>×</button>
                    <div className="menu-content">
                        <ul className="menu-list">
                            <li>MUSEUMS
                                <ul>
                                    <li><Link to="/louvre" onClick={handleMenuLinkClick}>루브르</Link></li>
                                    <li><Link to="/british" onClick={handleMenuLinkClick}>대영 박물관</Link></li>
                                    <li><Link to="/ermitage" onClick={handleMenuLinkClick}>에르미타주</Link></li>
                                    <li><Link to="/vatican" onClick={handleMenuLinkClick}>바티칸</Link></li>
                                    <li><Link to="/met" onClick={handleMenuLinkClick}>메트로폴리탄</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/exhibitions" onClick={handleMenuLinkClick}>특별전시</Link></li>
                            <li><Link to="/education" onClick={handleMenuLinkClick}>교육자료</Link></li>
                        </ul>
                        <div className="menu-bottom">
                            <button onClick={openAboutModal}>ABOUT</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ 로그인/회원가입 모달 */}
            {loginOpen && !user && (
                <div className="login-panel" ref={loginRef}>
                    <button className="close-button" onClick={toggleLogin}>×</button>
                    <h2>{isSignup ? 'SIGN UP' : 'LOG IN'}</h2>
                    {authError && <p className="error-text">{authError}</p>}
                    <form onSubmit={handleAuth}>
                        {isSignup && (
                            <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        )}
                        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {isSignup && (
                            <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        )}
                        <button type="submit">{isSignup ? '회원가입' : '로그인'}</button>
                    </form>
                    <div className="switch-auth">
                        {isSignup ? (
                            <p>이미 계정이 있나요? <button onClick={() => setIsSignup(false)}>로그인</button></p>
                        ) : (
                            <p>계정이 없나요? <button onClick={() => setIsSignup(true)}>회원가입</button></p>
                        )}
                    </div>
                </div>
            )}

            {/* ✅ ABOUT 모달 */}
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
                                    누구나 언제 어디서나 인류의 시각적 역사를 탐색하고 감상할 수 있도록 열려 있습니다.
                                </p>
                                <p className="en">
                                    Archive Musée is a digital archive of masterpieces from the world’s leading museums.<br />
                                    We provide open access to art and cultural heritage anytime, anywhere.
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
