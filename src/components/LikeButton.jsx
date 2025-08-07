import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './LikeButton.scss';




const LikeButton = ({ artworkId }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);

  // 🔐 로그인 상태 추적
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // ❤️ 좋아요 핸들러
  const handleLike = async () => {
    if (!user) {
      alert('로그인 후 이용해주세요!');
      return;
    }

    console.log('❤️ 좋아요 버튼 클릭됨');

    try {
      const likeRef = doc(db, 'likes', `${user.uid}_${artworkId}`);
      console.log("🔥 LikeButton 렌더링됨!", artworkId);
      const likeSnap = await getDoc(likeRef);

      if (likeSnap.exists()) {
        console.log('👍 이미 좋아요 누름 → 취소');
        await setDoc(likeRef, { liked: false }, { merge: true });
        setLiked(false);
      } else {
        console.log('✨ 처음 좋아요 누름 → 저장 시도');
        await setDoc(likeRef, {
          uid: user.uid,
          artworkId,
          liked: true,
          createdAt: new Date()
        });
        setLiked(true);
      }
    } catch (err) {
      console.error('❌ 좋아요 오류:', err);
    }
  };

  return (
    <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
      ❤️ {liked ? '좋아요 취소' : '좋아요'}
    </button>
  );
  
};

export default LikeButton;
