// Maps.js
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import UserLocationComponent from '../Components/UserLocationComponent';
import FriendsLocationComponent from '../Components/FriendsLocationComponent ';

import "../../public/styles/Map.css"
import { useDispatch, useSelector } from 'react-redux';
import { refreshLocations, updateUserLocation } from '../Services/UsersService';


import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Maps = () => {
    const [map, setMap] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [status, setStatus] = useState(null)
    const [error, setError] = useState(null);


    const locations = useSelector((state) => state.locations)
    const userData = useSelector((state) => state.userData)



    const dispatch = useDispatch();

    useEffect(() => {
        // Initialize the map with Tel Aviv, Israel coordinates
        const mapInstance = L.map('map').setView([32.0853, 34.7818], 13);
        setMap(mapInstance);

        // Add a tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        // Function to load specific map data
        const loadMap = (mapName) => {
            let coordinates;
            switch (mapName) {
                case 'israelCentral':
                    coordinates = [32.0853, 34.7818]; // Tel Aviv
                    break;
                case 'amsterdam':
                    coordinates = [52.3676, 4.9041]; // Amsterdam
                    break;
                case 'jeraOnAir':
                    coordinates = [51.4898, 5.8968]; // Jera on Air
                    break;
                default:
                    coordinates = [32.0853, 34.7818]; // Default to Tel Aviv
            }
            mapInstance.setView(coordinates, 13);
        };

        // Function to refresh locations
        const refreshLocations = () => {
            console.log('Refreshing locations');

        };

        // Function to start location selection
        const startLocationSelection = () => {
            console.log('Starting location selection');

        };

        // Get the user's current location and update state
        const addUserLocationMarker = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                }, error => {
                    console.error("Error getting location:", error);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        // Attach these functions to the window object so they can be called from the JSX
        window.loadMap = loadMap;
        window.refreshLocations = refreshLocations;
        window.startLocationSelection = startLocationSelection;

        // Add user location marker on load
        addUserLocationMarker();

        // Clean up function
        return () => {
            mapInstance.remove();
        };
    }, []);

    const moveToUserLocation = () => {
        if (map && userPosition) {
            map.setView(userPosition, 13);
        }
    };


    const updateLoc = () => {
        try {

        } catch (e) {
            setStatus(null)

            setError(e.message)
        }

    };


    const refresh = async () => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async position => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude, longitude, userData)
                    const result = await updateUserLocation({ latitude, longitude }, userData.user_id);
                    if (result.success) setStatus(result.message)
                    dispatch({ type: 'UPDATE_LOCATIONS', payload: result.locations })
                    setTimeout(() => moveToUserLocation(), 100)

                }, error => {
                    console.error("Error getting location:", error);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        } catch (e) {
            setStatus(null)
            setError(e.message)
        }
    }


    return (
        <div className='map-page'>
            <h1>Select a Map</h1>
            <div id="mapSelection">
                <button onClick={() => window.loadMap('israelCentral')}>Israel Central</button>
                <button onClick={() => window.loadMap('amsterdam')}>Amsterdam</button>
                <button onClick={() => window.loadMap('jeraOnAir')}>Jera on Air</button>
                <button id="refreshButton" onClick={() => refresh()}>Refresh All Locations</button>
                <button id="locationButton" onClick={() => window.startLocationSelection()}>Create Location</button>
                <button onClick={moveToUserLocation}>Go to My Location</button>
            </div> <br />
            {status ? <div>

                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {status}
                </Alert>

            </div> : error ? <Alert severity="error">{error}</Alert> : null}
            <div id="map" style={{ height: '500px', width: '100%' }}></div>

            {map && userPosition && <UserLocationComponent map={map} position={userPosition} />}
            {map && <FriendsLocationComponent map={map} locations={locations} />}
        </div>
    );
};

export default Maps;

