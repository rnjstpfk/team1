// LoginForm.jsx
import React, { useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('회원가입 성공!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('로그인 성공!');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">{isSignup ? '회원가입' : '로그인'}</button>
      <p>
        {isSignup ? '계정이 있으신가요?' : '계정이 없으신가요?'}
        <button type="button" onClick={() => setIsSignup((prev) => !prev)}>
          {isSignup ? '로그인' : '회원가입'}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
