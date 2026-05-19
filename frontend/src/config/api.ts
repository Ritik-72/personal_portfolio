/**
 * API Base URL helper.
 * In local development, fetches from the local FastAPI backend (port 8000).
 * In production (Vercel), requests are proxied via Vercel's multi-project service routing mapping to /_/backend.
 */
export const API_BASE = 
  typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000'
    : '/_/backend';
