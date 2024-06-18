import axios from "axios";

function getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async function updateUserLocation(location, user_id) {
    location.timestamp = getCurrentTimestamp()
    if (!location.latitude || !location.longitude || !location.timestamp) {
        alert('Invalid location:', location);
        return;
    }
   const {data} = await axios.put(`https://shlaimanfinderbackend.onrender.com/users/locations/${user_id}`, location)
    const locations = await refreshLocations()
    data.locations = locations
   return data

}

async function refreshLocations() {
    const { data } = await axios.get(`https://shlaimanfinderbackend.onrender.com/users/locations`)
    return data
}

export { updateUserLocation, refreshLocations }