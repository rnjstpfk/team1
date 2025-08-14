// src/types.ts
export type Artwork = {
  id: string;
  title: string;
  artist: string;
  date: string;
  image: string;       // 썸네일/정사이즈
  museum: 'met' | 'harvard' | 'cma' | 'british' | 'louvre' | 'ermitage' | 'vatican';
  credit?: string;
};
