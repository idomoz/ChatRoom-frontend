import Axios from 'axios'
let apiUrl = 'http://18.224.72.223';
if (process.env.NODE_ENV === "development")
    apiUrl = 'http://localhost:80';

const axios = {
    post: (url, data) => Axios.post(apiUrl + url, data, {headers: {Authorization: localStorage.getItem('jwt')}}),
    put: (url, data) => Axios.put(apiUrl + url, data, {headers: {Authorization: localStorage.getItem('jwt')}}),
    get: url => Axios.get(apiUrl + url, {headers: {Authorization: localStorage.getItem('jwt')}}),
    delete: url => Axios.delete(apiUrl + url, {headers: {Authorization: localStorage.getItem('jwt')}}),
};
export {
    axios
}