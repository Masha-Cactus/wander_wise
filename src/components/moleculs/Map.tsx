'use client';

import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';
import { useEffect, memo, useRef } from 'react';

type Props = {
  coordinates: {
    latitude: number,
    longitude: number,
  }
};

const Map: React.FC<Props> = ({ coordinates }) => {
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
    <div className="relative w-full h-72 rounded-2xl overflow-hidden">
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