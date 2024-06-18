import axios from "axios";


const loginAddress = 'https://shlaiman.online/api/v1/login';

async function login(payload) {
    const { data: result } = await axios.post(loginAddress, payload);
    
    result.token = result["api_token"]
    return result
}

async function signup(endpoint, payload) {
    const response = await axios.post(endpoint, payload);
    const result = response.data;
    return result
}

export { login, signup }