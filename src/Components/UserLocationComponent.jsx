// UserLocationComponent.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import UserLocation from './UserLocation';

const UserLocationComponent = ({ map, position }) => {
    useEffect(() => {
        const icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div id='user-location-container'></div>",
            iconSize: [30, 30], // Adjusted to better center the icon
            iconAnchor: [15, 15], // Center the icon
        });

        const marker = L.marker(position, { icon }).addTo(map);
        map.setView(position, 13);

        const container = document.getElementById('user-location-container');
        if (container) {
            const root = createRoot(container);
            root.render(<UserLocation />);
        }

        return () => {
            map.removeLayer(marker);
        };
    }, [map, position]);

    return null;
};

export default UserLocationComponent;
