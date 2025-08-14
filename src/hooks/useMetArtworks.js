// src/hooks/useMetArtworks.js
import { useEffect, useState } from 'react';

export default function useMetArtworks(query = 'cat', limit = 24) {
  const [data, setData] = useState([]);     // Artwork[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setLoading(true);
        // 1) 검색해 objectIDs 받기
        const s = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(query)}`);
        const sj = await s.json();
        const ids = (sj.objectIDs || []).slice(0, limit);

        // 2) 상세 병렬 요청
        const details = await Promise.all(
          ids.map(id =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(r => r.json())
          )
        );

        // 3) UI 공통형으로 매핑
        const mapped = details
          .filter(o => o && (o.primaryImageSmall || o.primaryImage))
          .map(o => ({
            id: String(o.objectID),
            title: o.title || 'Untitled',
            artist: o.artistDisplayName || 'Unknown',
            date: o.objectDate || o.objectBeginDate || '',
            image: o.primaryImageSmall || o.primaryImage,
            museum: 'met',
            credit: o.creditLine || ''
          }));

        if (alive) setData(mapped);
      } catch (e) {
        if (alive) setError(String(e));
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => { alive = false; };
  }, [query, limit]);

  return { data, loading, error };
}
