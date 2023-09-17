import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "http://192.168.1.227:8080/api/v1";

interface RegisterData {
    username: string
    email: string
    password: string
}

interface LoginData {
    username: string
    password: string
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add the token to Axios headers
export const addTokenToAxios = async () => {
    const jwtToken = await getAccessToken();
    if (jwtToken) {
        axiosInstance.defaults.headers.common['Authorization'] = jwtToken;
    }
};

// Store the JWT token securely
export const storeAccessToken = async (token: string) => {
    await SecureStore.setItemAsync('jwtToken', token);
};

// Retrieve the JWT token from SecureStore
export const getAccessToken = async () => {
    return await SecureStore.getItemAsync('jwtToken');
};

export const registerApi = ({email, username, password}: RegisterData) => {
    return axiosInstance({
        method: "POST",
        url: "/register",
        data: {
            email,
            username,
            password
        }
    });
};

export const loginApi = async ({username, password}: LoginData) => {
    try {
        const loginResponse = await axiosInstance({
            method: "POST",
            url: "/login",
            data: {
                username,
                password
            }
        });

        if (loginResponse && loginResponse.headers) {
            const jwtToken = loginResponse.headers['authorization'];
            if (jwtToken) {
                await storeAccessToken(jwtToken);
                await addTokenToAxios();
                return loginResponse.data;
            } else {
                alert("JWT token not found in response headers");
            }
        } else {
            alert("Invalid response format from the server");
        }
    } catch (err) {
        throw err;
    }
};
