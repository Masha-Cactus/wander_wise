'use client';

import { useEffect, memo } from 'react';
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

interface MapProps {
  coordinates: {
    latitude: number,
    longitude: number,
  },
  height: string,
}

const Map: React.FC<MapProps> = ({ coordinates, height }) => {
  const { latitude, longitude } = coordinates;
  const radarKey = process.env.NEXT_PUBLIC_RADAR_KEY;

  useEffect(() => {
    if (radarKey) {
      Radar.initialize(radarKey);
    }

    const map = new (Radar.ui as any).map({
      container: 'map',
      style: 'radar-default-v1',
      center: [longitude, latitude],
      zoom: 14,
    });
        
    Radar.ui.marker({ text: 'Radar HQ' })
      .setLngLat([longitude, latitude])
      .addTo(map);
  }, [radarKey, latitude, longitude]);

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height }}
    >
      <div 
        id="map-container" 
        style={{ height: '100%', position: 'absolute', width: '100%' }}
      >
        <div 
          id="map" 
          style={{ height: '100%', position: 'absolute', width: '100%' }} 
        />
      </div>
    </div>
  );
};

export default memo(Map);