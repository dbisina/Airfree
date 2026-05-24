// Leaflet is an optional peer dependency.
// Install with: npm install leaflet @types/leaflet
// This stub prevents TypeScript errors when leaflet is not installed.
declare module 'leaflet' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const L: any;
  export = L;
}

declare module 'leaflet/dist/leaflet.css' {
  const styles: string;
  export default styles;
}
