import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');   // ✅ 사용자명 상태 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // ✅ 로그인 상태 유지
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

  // ✅ 회원가입 & 로그인 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // 회원가입
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // Firestore에 email + username 저장
        await setDoc(doc(db, 'users', newUser.uid), {
          username: username,     // ✅ 사용자명 저장
          email: newUser.email,
          createdAt: new Date(),
        });

        alert('✅ 회원가입 & 아이디 저장 완료');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('✅ 로그인 성공');
      }
    } catch (err) {
      alert('❌ 오류: ' + err.message);
    }
  };

  // ✅ 로그아웃
  const handleLogout = async () => {
    // 1. Firebase 로그아웃
    await signOut(auth);

    // 2. localStorage에서 like 기록 모두 삭제
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("like:")) {
        localStorage.removeItem(key);
      }
    });

    alert('🚪 로그아웃 완료');
  };



  // ✅ UI 렌더링
  if (user) {
    return (
      <div className="p-6 bg-white shadow rounded w-96">
        <h2 className="text-xl font-bold mb-3">👋 환영합니다!</h2>
        <p>아이디: {userData?.username}</p>
        <p>이메일: {userData?.email}</p>
        <button onClick={handleLogout} className="mt-3 px-4 py-2 bg-red-500 text-white rounded">로그아웃</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-96">
      <h2 className="text-xl font-bold mb-3">{isSignup ? '회원가입' : '로그인'}</h2>

      {/* ✅ 회원가입일 때만 아이디 입력 */}
      {isSignup && (
        <input
          type="text"
          placeholder="아이디(닉네임)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
      )}

      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">{isSignup ? '회원가입' : '로그인'}</button>

      <p className="mt-2 text-sm">
        {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
        <button type="button" onClick={() => setIsSignup(prev => !prev)} className="text-blue-600 underline">
          {isSignup ? '로그인' : '회원가입'}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
