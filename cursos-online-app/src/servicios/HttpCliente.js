
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.request.use((config) =>{
    const token_seguridad = window.localStorage.getItem('token_seguridad');
    if(token_seguridad){
        config.headers.Authorization = 'Bearer ' + token_seguridad;
        return config;
    }
}, error => {
    return Promise.reject(error);
});

const requestGenerico = {
    //Definimos que cada metodo entrara url o url y body y que la respuesta para todos es response
        get : (url) => axios.get(url),
        post : (url, body) => axios.post(url,body),
        put : (url, body) => axios.put(url, body),
        delete : (url) => axios.delete(url)
};

export default requestGenerico;