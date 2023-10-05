import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});