import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // 👈 firebase 설정 파일 import

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Louvre from './pages/Louvre';
import British from './pages/British';
import Ermitage from './pages/Ermitage';
// import About from './pages/About';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ 로그인됨:', user.email);
      } else {
        console.log('⛔ 로그아웃됨');
      }
    });

    return () => unsubscribe(); // 정리
  }, []);

  return (
    <div className="wrapper">
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/louvre" element={<Louvre />} />
            <Route path="/british" element={<British />} />
            <Route path="/ermitage" element={<Ermitage />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
