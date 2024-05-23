import React, { useState, useEffect } from 'react';
import {
  TileLayer,
  Marker,
  Popup,
  MapContainer,
  useMapEvents,
} from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapComponent = () => {
  const [locationAllowed, setLocationAllowed] = useState(null); // Use null to indicate uninitialized state

  const requestLocationPermission = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllowed(true);
        },
        (error) => {
          console.error('Error accessing location:', error);
          setLocationAllowed(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationAllowed(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    const iconSvgHtml = renderToString(<LocationOnIcon />);
    const locationIcon = L.divIcon({
      className: 'my-custom-icon',
      html: iconSvgHtml,
      iconSize: [100, 100],
      iconAnchor: [25, 50],
    });

    return position === null ? null : (
      <Marker position={position} icon={locationIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  if (locationAllowed === null) {
    return <div>Requesting location permission...</div>;
  }

  if (locationAllowed === false) {
    return <div>Location access denied. Please allow location access to view the map.</div>;
  }

  return (
    <div>
      <MapContainer
        style={{ height: '100vh', width: '100%' }}
        center={{ lat: 47.478419, lng: -0.563166 }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
