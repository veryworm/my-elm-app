import axios from "axios"

const ERR_OK = 0

const base = process.env.NODE_ENV

export function get(url) {
    console.log(url, 'url');
    return function (params) {
        console.log(url, 'url');
        return axios.get(url, {
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