// src/api/museumAdapters.js
const MET_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';
const HARVARD_BASE = 'https://api.harvardartmuseums.org';
const CMA_BASE = 'https://openaccess-api.clevelandart.org/api';

/** 직접 호출 실패 시 공개 프록시로 한 번 더 시도 */
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

export async function fetchMetById(id) {
  const o = await fetchJSONWithFallback(`${MET_BASE}/objects/${id}`);
  return {
    id: String(o.objectID),
    title: o.title || 'Untitled',
    artist: o.artistDisplayName || 'Unknown',
    artistBio: o.artistDisplayBio || '',
    date: o.objectDate || String(o.objectBeginDate ?? ''),
    image: o.primaryImage || o.primaryImageSmall || '',
    extraImages: Array.isArray(o.additionalImages) ? o.additionalImages : [],
    medium: o.medium || '',
    dimensions: o.dimensions || '',
    culture: o.culture || '',
    period: o.period || '',
    department: o.department || '',
    gallery: o.galleryNumber || '',
    credit: o.creditLine || '',
    links: {
      museum: o.objectURL || '',
      wiki: o.objectWikidata_URL || ''
    },
    museum: 'met'
  };
}

export async function fetchHarvardById(id, apiKey = import.meta.env.VITE_HARVARD_KEY) {
  const o = await fetchJSONWithFallback(`${HARVARD_BASE}/object/${id}?apikey=${apiKey}`);
  const img = o.images?.[0]?.baseimageurl || '';
  return {
    id: String(o.id),
    title: o.title || 'Untitled',
    artist: (o.people && o.people[0]?.name) || 'Unknown',
    artistBio: '',
    date: o.dated || '',
    image: img,
    extraImages: (o.images || []).map(i => i.baseimageurl).filter(Boolean),
    medium: o.medium || o.technique || '',
    dimensions: o.dimensions || '',
    culture: o.culture || '',
    period: o.period || '',
    department: o.department || '',
    gallery: o.gallery || '',
    credit: o.creditline || '',
    links: { museum: o.url || '' },
    museum: 'harvard'
  };
}

export async function fetchCmaById(id) {
  const j = await fetchJSONWithFallback(`${CMA_BASE}/objects/${id}`);
  const o = j.data;
  return {
    id: String(o?.id ?? id),
    title: o?.title || 'Untitled',
    artist: o?.creators?.[0]?.description || o?.creators?.[0]?.role || 'Unknown',
    artistBio: '',
    date: o?.creation_date || '',
    image: o?.images?.web?.url || '',
    extraImages: (o?.images?.print || o?.images?.web ? [o?.images?.web?.url] : []).filter(Boolean),
    medium: o?.technique || '',
    dimensions: o?.dimensions || '',
    culture: o?.culture || '',
    period: o?.period || '',
    department: o?.department || '',
    gallery: '',
    credit: o?.creditline || '',
    links: { museum: o?.url || '' },
    museum: 'cma'
  };
}

export async function fetchByMuseumAndId(museum, id) {
  switch (museum) {
    case 'met':     return fetchMetById(id);
    case 'harvard': return fetchHarvardById(id);
    case 'cma':     return fetchCmaById(id);
    default: throw new Error(`지원하지 않는 박물관: ${museum}`);
  }
}
