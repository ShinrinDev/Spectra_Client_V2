import React from 'react';
import { Map, Marker } from 'pigeon-maps';

interface Location {
  lat: number;
  lng: number;
  label: string;
}

const MapOne: React.FC = () => {
  const locations: Location[] = [
    { lat: 51.5074, lng: -0.1278, label: 'London' },
    { lat: 40.7128, lng: -74.006, label: 'New York' },
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
    { lat: 48.8566, lng: 2.3522, label: 'Paris' },
    { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  ];

  return (
    <div className="col-span-12 xl:col-span-3 2xl:col-span-8 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-customDarkGray">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Leads Location
      </h4>
      <div style={{ height: '400px', width: '100%' }}>
        <Map height={400} defaultCenter={[0, 0]} defaultZoom={2}>
          {locations.map((location, index) => (
            <Marker
              key={index}
              width={50}
              anchor={[location.lat, location.lng]}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default MapOne;
