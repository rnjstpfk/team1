import { useEffect, useState } from "react";

export default function LikeButton({ artworkId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`like:${artworkId}`);
    if (saved !== null) setLiked(saved === "1");
  }, [artworkId]);

  const toggle = (e) => {
    // ✅ 링크 클릭 이벤트 막기
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => {
      const next = !prev;
      localStorage.setItem(`like:${artworkId}`, next ? "1" : "0");
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
