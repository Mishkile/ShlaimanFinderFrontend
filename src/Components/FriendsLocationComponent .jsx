// FriendsLocationComponent.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import "../../public/styles/FriendsLocations.css"
const FriendsLocationComponent = ({ map, locations }) => {
    useEffect(() => {
        if (map && locations) {
            const getIconColorClass = (location) => {
                // Logic to determine the color class based on location data
                // For example, based on some status or other criteria
                return 'default-color-class'; // Replace with actual logic
            };

            locations.forEach(location => {
                const position = [location.latitude, location.longitude];
                const iconColorClass = getIconColorClass(location);
                const customIcon = L.divIcon({
                    className: `custom-marker ${iconColorClass}`,
                    html: `<div class="marker-image" style="background-image: url('${location.profile_image}');"></div>`,
                    iconSize: [50, 60],
                    iconAnchor: [25, 60],
                    popupAnchor: [0, -60]
                });

                L.marker(position, { icon: customIcon }).addTo(map).bindPopup(`<b>${location.username}</b><br>${location.note}`).openPopup();
            });
        }
    }, [map, locations]);

    return null;
};

export default FriendsLocationComponent;
