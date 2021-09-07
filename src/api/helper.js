import axios from "axios"

const ERR_OK = 0

const urlMap = {
    development: '',
    production: 'http://121.41.116.109:8900'
}
const base = process.env.NODE_ENV
const baseURL = urlMap[base]
console.log(baseURL, base, 'baseURL');
export function get(url) {
    return function (params) {
        return axios.get(baseURL + url, {
            params
        }).then((res) => {
            console.log(res.data, 'res.data');
            if (base === 'production') {
                const {
                    errno,
                    data
                } = res.data
                if (errno === ERR_OK) {
                    return data
                }
            } else {
                const {
                    error,
                    data
                } = res.data
                if (error === ERR_OK) {
                    return data
                }
            }
        }).catch((e) => {
            console.log(e, 'ee');

        })
    }
}