import axios from "axios";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password }) =>
        await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true
        }),
    login: async ({ email, password }) =>
        await httpAuth.post(`accounts:signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        })
};

export default authService;
