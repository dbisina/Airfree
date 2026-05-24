'use client';
/**
 * WMSMap — Leaflet-based interactive map with CMS-configured WMS layers.
 *
 * Leaflet is loaded from CDN at runtime — no npm install required.
 * Configure WMS endpoints via Admin → WMS Layers.
 */
import { useEffect, useRef, useState } from 'react';
import { useCMS } from '@/lib/useCMS';
import type { CMSWMSLayer } from '@/lib/cms-store';

interface Props {
  height?: string;
  center?: [number, number];
  zoom?: number;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L?: any;
  }
}

function initMap(
  el: HTMLDivElement,
  center: [number, number],
  zoom: number,
  layers: CMSWMSLayer[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const L = window.L;
  if (!L) return null;

  const map = L.map(el, { center, zoom, zoomControl: true });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  for (const layer of layers.filter(l => l.visible && l.url && l.layers)) {
    L.tileLayer.wms(layer.url, {
      layers: layer.layers,
      format: layer.format || 'image/png',
      transparent: layer.transparent ?? true,
      attribution: layer.attribution || '',
      opacity: layer.opacity ?? 1,
    }).addTo(map);
  }

  return map;
}

export function WMSMap({ height = '520px', center = [-34.8, 138.6], zoom = 8 }: Props) {
  const cms = useCMS();
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const layers = cms.wms_layers ?? [];

  useEffect(() => {
    if (!mapRef.current) return;

    const el = mapRef.current;

    function tryInit() {
      if (mapInstance.current) return;
      const map = initMap(el, center, zoom, layers);
      if (map) {
        mapInstance.current = map;
        setReady(true);
      }
    }

    // If Leaflet already loaded (e.g. HMR), init immediately
    if (window.L) {
      tryInit();
      return;
    }

    // Inject CSS
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject JS
    if (!document.querySelector('#leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV/XN/WPsE=';
      script.crossOrigin = '';
      script.onload = () => tryInit();
      document.head.appendChild(script);
    } else {
      // Script tag exists but onload already fired — wait a tick
      const t = setTimeout(() => tryInit(), 100);
      return () => clearTimeout(t);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleCount = layers.filter(l => l.visible && l.url).length;

  return (
    <div className="relative border border-border-s overflow-hidden" style={{ height }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

      {/* Loading */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface pointer-events-none">
          <span className="font-mono text-[0.6rem] tracking-widest uppercase text-ink-3 animate-pulse">
            Loading map...
          </span>
        </div>
      )}

      {/* No WMS layers note */}
      {ready && visibleCount === 0 && (
        <div className="absolute bottom-4 left-4 bg-white/90 border border-border-s px-3 py-2 pointer-events-none">
          <span className="font-mono text-[0.55rem] tracking-widest uppercase text-ink-3">
            No WMS layers — add via Admin &rarr; WMS Layers
          </span>
        </div>
      )}
    </div>
  );
}
