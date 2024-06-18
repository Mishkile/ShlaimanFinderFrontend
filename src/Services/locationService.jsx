import axios from "axios"

const locationAddress = `https://shlaimanfinderbackend.onrender.com/users/locations`


async function getLocations() {
    const {data: locations} = await axios.get(locationAddress)
    return locations

}

export { getLocations }