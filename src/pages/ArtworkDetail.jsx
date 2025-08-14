import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import './ArtworkDetail.scss';

const MET_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

// 네트워크/CORS 이슈 시 공개 프록시로 재시도
async function fetchJSONWithFallback(url) {
  try {
    const r = await fetch(url, { credentials: 'omit' });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
    return await r.json();
  } catch (e) {
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const r2 = await fetch(proxied, { credentials: 'omit' });
    if (!r2.ok) throw new Error(`(proxy) HTTP ${r2.status} ${r2.statusText}`);
    return await r2.json();
  }
}

export default function ArtworkDetail() {
  const { museum, id } = useParams();          // /:museum/artwork/:id
  const location = useLocation();

  // 목록에서 넘어온 간이 데이터(있으면 즉시 표시)
  const preloaded = location.state?.art || null;
  const backPath = location.state?.from || `/${museum || 'met'}`;

  const [art, setArt] = useState(preloaded);
  const [loading, setLoading] = useState(!preloaded);
  const [error, setError] = useState('');

  // ★ 항상 전체 필드 다시 페치: preloaded가 있어도 즉시 표시하고, 곧바로 보강
  useEffect(() => {
    let alive = true;

    async function fetchFull() {
      try {
        setLoading(true);
        setError('');

        if ((museum || 'met') !== 'met') {
          throw new Error(`현재는 MET만 지원 중입니다. (museum="${museum}")`);
        }

        const o = await fetchJSONWithFallback(`${MET_BASE}/objects/${id}`);

        if (!alive) return;

        const mapped = {
          id: o.objectID,
          title: o.title || 'Untitled',
          artist: o.artistDisplayName || 'Unknown',
          artistBio: o.artistDisplayBio || '',
          nationality: o.artistNationality || '',
          date: o.objectDate || String(o.objectBeginDate ?? ''),
          image: o.primaryImage || o.primaryImageSmall || '',
          additionalImages: Array.isArray(o.additionalImages) ? o.additionalImages : [],
          department: o.department || '',
          culture: o.culture || '',
          period: o.period || '',
          medium: o.medium || '',
          dimensions: o.dimensions || '',
          credit: o.creditLine || '',
          gallery: o.galleryNumber || '',
          description: o.galleryText || o.medium || '',   // 설명 대체
          objectURL: o.objectURL || '',
          wikiURL: o.objectWikidata_URL || '',
          museum: 'met'
        };

        setArt(mapped);
      } catch (e) {
        setError(`상세 정보를 불러오는 중 오류가 발생했습니다.\n${e?.message || e}`);
      } finally {
        setLoading(false);
      }
    }

    fetchFull();
    return () => { alive = false; };
  }, [museum, id]);

  if (loading && !art) {
    return <div className="detail-page"><div className="detail-loading">불러오는 중…</div></div>;
  }
  if (error && !art) {
    return <div className="detail-page"><div className="detail-error" style={{whiteSpace:'pre-line'}}>{error}</div></div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-topbar">
        <Link to={backPath} className="back">← Back</Link>
        {art?.objectURL && (
          <a className="ext" href={art.objectURL} target="_blank" rel="noreferrer">MET 페이지 ↗</a>
        )}
      </div>

      <div className="detail-hero">
        {art?.image ? (
          <img src={art.image} alt={art.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="detail-info">
        <h1 className="title">{art?.title || '-'}</h1>
        <p className="meta">
          <b>{art?.artist || 'Unknown'}</b>
          {art?.artistBio ? ` · ${art.artistBio}` : ''}
          {art?.date ? ` · ${art.date}` : ''}
          {art?.museum ? ` · ${art.museum.toUpperCase()}` : ''}
        </p>

        <dl className="kv">
          {art?.medium && (<><dt>Medium</dt><dd>{art.medium}</dd></>)}
          {art?.dimensions && (<><dt>Dimensions</dt><dd>{art.dimensions}</dd></>)}
          {art?.culture && (<><dt>Culture</dt><dd>{art.culture}</dd></>)}
          {art?.period && (<><dt>Period</dt><dd>{art.period}</dd></>)}
          {art?.department && (<><dt>Department</dt><dd>{art.department}</dd></>)}
          {art?.gallery && (<><dt>Gallery</dt><dd>{art.gallery}</dd></>)}
          {art?.credit && (<><dt>Credit</dt><dd>{art.credit}</dd></>)}
        </dl>

        {art?.description && (
          <>
            <h2 className="sub">Description</h2>
            <p className="desc">{art.description}</p>
          </>
        )}

        {Array.isArray(art?.additionalImages) && art.additionalImages.length > 0 && (
          <>
            <h2 className="sub">More Images</h2>
            <div className="thumbs">
              {art.additionalImages.slice(0, 12).map((url, i) => (
                <a key={i} className="thumb" href={url} target="_blank" rel="noreferrer">
                  <img src={url} alt={`additional-${i}`} />
                </a>
              ))}
            </div>
          </>
        )}

        {(art?.wikiURL || art?.objectURL) && (
          <p className="links">
            {art?.wikiURL && <a href={art.wikiURL} target="_blank" rel="noreferrer">Wikidata ↗</a>}
            {' '}
            {art?.objectURL && <a href={art.objectURL} target="_blank" rel="noreferrer">MET ↗</a>}
          </p>
        )}

        {loading && <div className="detail-loading" style={{marginTop:12}}>세부 정보 불러오는 중…</div>}
        {error && <div className="detail-error" style={{whiteSpace:'pre-line'}}>{error}</div>}
      </div>
    </div>
  );
}
