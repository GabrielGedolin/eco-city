import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrige o problema dos ícones padrão do Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

const MapaComponent = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // Inicializa o mapa
      mapRef.current = L.map(mapContainerRef.current, {
        center: [-22.12035889198807, -51.38949783562705],
        zoom: 17,
        minZoom: 17,
        maxBounds: L.latLngBounds(
          [-22.1600, -51.4500],
          [-22.0800, -51.3500]
        ),
        maxBoundsViscosity: 1.0,
      });

      // Adiciona os tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Ícone personalizado
      const pointIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Adiciona marcador
      L.marker([-22.1206, -51.4059], { icon: pointIcon })
        .addTo(mapRef.current)
        .bindPopup('📍 Ponto de Coleta - SENAI Presidente Prudente');

      // Função para expandir/recolher
      const toggleMapSize = () => {
        const container = mapContainerRef.current;
        if (!container || !mapRef.current) return;

        const isExpanded = container.classList.contains('expanded');
        
        if (!isExpanded) {
          container.classList.add('expanded');
          container.style.position = 'fixed';
          container.style.top = '0';
          container.style.left = '0';
          container.style.width = '100vw';
          container.style.height = '100vh';
          container.style.zIndex = '9999';
        } else {
          container.classList.remove('expanded');
          container.style.position = 'relative';
          container.style.width = '100%';
          container.style.height = '400px';
        }

        // Atualiza o tamanho do mapa após a transição
        setTimeout(() => {
          mapRef.current?.invalidateSize();
        }, 300);
      };

      // Adiciona evento de clique
      mapContainerRef.current.addEventListener('click', toggleMapSize);
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        borderRadius: '10px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
      }}
    ></div>
  );
};

export default MapaComponent;