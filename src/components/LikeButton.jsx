import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function LikeButton({ artworkId }) {
  const [liked, setLiked] = useState(false);
  const [uid, setUid] = useState(null);

  // 유저 상태 구독
  useEffect(() => {
    const off = auth.onAuthStateChanged(user => {
      const newUid = user?.uid || null;
      setUid(newUid);

      // 유저가 있을 때만 저장 읽기
      if (newUid) {
        const key = `like:${newUid}:${artworkId}`;
        const saved = localStorage.getItem(key);
        setLiked(saved === "1");
      } else {
        setLiked(false); // 비로그인 시 항상 off
      }
    });
    return () => off();
  }, [artworkId]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!uid) {
      alert("로그인해야 좋아요를 누를 수 있습니다.");
      return;
    }

    setLiked(prev => {
      const next = !prev;
      const key = `like:${uid}:${artworkId}`;
      if (next) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      return next;
    });
  };

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={toggle}
      aria-pressed={liked}
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}
