import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

export const userService = {
    async login(username, password) {
        try{

            let data = {
                username: username,
                password: password
            }
            let url = process.env.VUE_APP_API_URL+'/login/authenticate/?payload=' + btoa(JSON.stringify(data))
            let res = await instance.get(url);
            if (res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }
            return res.data.user;

        }catch(error) {
            console.log(error);
            return error;

        }

    },
    logout() {
        localStorage.removeItem('user');
    },
}