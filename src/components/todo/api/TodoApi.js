import { apiClient } from "./apiClient";
import { token } from "./token";


export default class TodoApi {
    constructor() {
        this.BaseUrl = "http://localhost:8080"
    }

    getHeader() {
        const token = localStorage.getItem("token")
        if (token) return {
            Authorization: token
        }

        return {}
    }

    async retrieveAll(username) {
        console.log(token)
    
        try {
            console.log(this.getHeader())
            const response = await apiClient.get(`/users/${username}/todos`, { headers: this.getHeader()});
            return response;
        } catch (error) {
            return null;
        }
    }
    

    async getById(id) {
        try {
            const response = await apiClient.get(this.BaseUrl + `/todos/${id}`, { headers: this.getHeader()})
            return response;
        } catch (error) {
            return null;
        }
    }

    async update(id, body) {
        try {
            const response = await apiClient.put(this.BaseUrl + `/todos/${id}`, body, { headers: this.getHeader()})
            return response;
        } catch (error) {
            return null;
        }
    }

    async delete(id) {
        try {
            const response = await apiClient.delete(this.BaseUrl + `/todos/${id}`, { headers: this.getHeader()})
            return response;
        } catch (error) {
            return null;
        }
    }

    async create(username, body) {
        try {
            const response = await apiClient.post(this.BaseUrl + `/users/${username}/todos`, body, { headers: this.getHeader()})
            return response;
        } catch (error) {
            return null;
        }
    }
}