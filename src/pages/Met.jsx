// src/pages/Met.jsx
import './Met.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../components/LikeButton';

const PAGE_SIZE = 18;                 // 한 번에 불러올 개수 (너무 크면 느려짐)
const CONCURRENCY = 6;                // 동시 상세 요청 개수 (네트워크에 맞춰 4~8 사이 추천)
const SEARCH_QUERY = 'painting';
const MET_BASE =
  process.env.NODE_ENV === 'development'
    ? '/metapi'
    : 'https://collectionapi.metmuseum.org/public/collection/v1';


// CORS/망 차단 시에만 프록시 사용
async function fetchJSONWithFallback(url) {
  try {
    const r = await fetch(url, { credentials: 'omit' });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
    return await r.json();
  } catch (err) {
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const r2 = await fetch(proxied, { credentials: 'omit' });
    if (!r2.ok) throw new Error(`(proxy) HTTP ${r2.status} ${r2.statusText}`);
    return await r2.json();
  }
}

// 동시성 제한 큐
async function fetchPool(urls, worker, concurrency = 6) {
  const out = [];
  let i = 0;
  async function run() {
    while (i < urls.length) {
      const idx = i++;
      try {
        const v = await worker(urls[idx], idx);
        out[idx] = v;
      } catch {
        out[idx] = null;
      }
    }
  }
  const runners = Array.from({ length: Math.min(concurrency, urls.length) }, run);
  await Promise.all(runners);
  return out;
}

export default function Met() {
  const [allIds, setAllIds] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingIds, setLoadingIds] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);

  // 1) ID 목록 불러오기 + 첫 페이지 로딩
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingIds(true);
        setError('');

        let result = await fetchJSONWithFallback(
          `${MET_BASE}/search?hasImages=true&q=${encodeURIComponent(SEARCH_QUERY)}`
        );
        if (!result?.objectIDs || result.objectIDs.length === 0) {
          result = await fetchJSONWithFallback(`${MET_BASE}/search?hasImages=true&q=art`);
        }
        const ids = Array.isArray(result?.objectIDs) ? result.objectIDs : [];
        if (!alive) return;

        if (ids.length === 0) {
          setAllIds([]); setHasMore(false);
          setError('검색 결과가 없습니다. 검색어를 바꿔보세요.');
          return;
        }

        setAllIds(ids);
        setArtworks([]);
        setPage(0);
        setHasMore(true);

        await loadChunk(ids, 0); // 첫 페이지
      } catch (e) {
        if (!alive) return;
        setError(`MET API 검색 오류.\n${e?.message || e}`);
        setAllIds([]); setHasMore(false);
      } finally {
        if (!alive) return;
        setLoadingIds(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // 2) 페이지 청크 로딩 (동시성 제한 + 점진 렌더링)
  async function loadChunk(ids, p) {
    setLoadingMore(true);
    setError('');
    try {
      const start = p * PAGE_SIZE;
      const end = Math.min(start + PAGE_SIZE, ids.length);
      const slice = ids.slice(start, end);
      if (slice.length === 0) { setHasMore(false); return; }

      // 먼저 placeholder 넣어 화면 자리 확보 (스켈레톤)
      setArtworks(prev => [
        ...prev,
        ...slice.map(id => ({ id, __loading: true })) // 임시 카드
      ]);

      // 동시성 제한으로 상세 요청
      const urls = slice.map(id => `${MET_BASE}/objects/${id}`);
      const details = await fetchPool(
        urls,
        (url) => fetchJSONWithFallback(url),
        CONCURRENCY
      );

      // 결과를 매핑하며 기존 placeholder 교체
      setArtworks(prev => {
        const next = [...prev];
        // 청크가 prev 끝에 붙여졌다고 가정하고 끝에서 slice 길이만큼 교체
        const base = prev.length - slice.length;
        details.forEach((o, i) => {
          const safe = o && (o.primaryImageSmall || o.primaryImage);
          next[base + i] = safe ? {
            id: o.objectID,
            title: o.title || 'Untitled',
            image: o.primaryImageSmall || o.primaryImage,
            info: `${o.artistDisplayName || 'Unknown'}${o.objectDate ? ` (${o.objectDate})` : ''}`,
          } : null;
        });
        // 이미지 없는 항목 제거
        return next.filter(Boolean);
      });

      const nextStart = (p + 1) * PAGE_SIZE;
      setHasMore(nextStart < ids.length);
    } catch (e) {
      setError(`작품 상세 로드 오류.\n${e?.message || e}`);
    } finally {
      setLoadingMore(false);
    }
  }

  const handleLoadMore = async () => {
    const next = page + 1;
    await loadChunk(allIds, next);
    setPage(next);
  };

  return (
    <div className="met">
      {/* 히어로/비디오 */}
      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/여기에_메트_영상_URL"
          title="Metropolitan Museum of Art Tour"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="video-overlay-text"><h1>The Met - 2025</h1></div>
      </div>

      {/* 본문 */}
      <div className="main_section">
        {error && <div className="page-error" style={{ whiteSpace: 'pre-line' }}>{error}</div>}
        {(loadingIds && artworks.length === 0) && <div className="page-loading">불러오는 중…</div>}

        <section className="gallery">
          {artworks.map((art) => (
            art.__loading ? (
              // 스켈레톤 카드
              <div key={`s-${art.id}`} className="galleryItem skeleton">
                <div className="image-wrapper skeleton-box" />
                <h3 className="skeleton-line" />
                <p className="skeleton-line short" />
              </div>
            ) : (
              <Link
                to={`/met/artwork/${art.id}`}
                state={{ from: '/met', art }}
                key={art.id}
                className="galleryItem"
              >
                <div className="image-wrapper">
                  <LikeButton artworkId={`met-${art.id}`} />
                  <img loading="lazy" src={art.image} alt={art.title} />
                </div>
                <h3>{art.title}</h3>
                <p>{art.info || ' '}</p>
              </Link>
            )
          ))}
        </section>

        <div className="infinite-footer">
          {loadingMore ? (
            <div className="page-loading">더 불러오는 중…</div>
          ) : hasMore ? (
            <button className="load-more" onClick={handleLoadMore}>더 보기</button>
          ) : (
            artworks.length > 0 && <div className="page-end">마지막 작품까지 다 봤어요 👋</div>
          )}
        </div>
      </div>
    </div>
  );
}
