'use client';

import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';
import { useEffect, memo } from 'react';

type Props = {
  mapLink: string,
};

const Map: React.FC<Props> = ({ mapLink }) => {
  const regex = /query=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = mapLink.match(regex);
  

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_KEY as string);
  }, []);

  useEffect(() => {
    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
  
      const map = new (Radar.ui as any).map({
        container: 'map',
        style: 'radar-default-v1',
        center: [longitude, latitude],
        zoom: 14,
      });
          
      Radar.ui.marker({ text: 'Radar HQ' })
        .setLngLat([longitude, latitude])
        .addTo(map);
    }
  }, [mapLink]);

  return (
    <div id="map-container" className='w-full h-full'>
      <div id="map" className='w-full h-full' />
    </div>
  );
};

export default memo(Map);