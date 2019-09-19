/// <reference path="../../../node_modules/axios/index.d.ts"/>

import * as axios from "axios";

interface DockerApi {
    createService(data): Promise<any>,
    updateService(store_id: String, data): Promise<any>,
    pauseService(store_id: String, data): Promise<any>,
    resumeService(store_id: String, data): Promise<any>,
    killService(store_id: String,data): Promise<any>
}

let axiosInstance = axios.default.create({
    baseURL: "http://0.0.0.0:2375/v1.40"
})
///v1.18
class DockerRestApi implements DockerApi {

    createService(data): Promise<any> {
        return new Promise(function (res, rej) {
            axiosInstance.post("/services/create", data).then(response => {
                console.log("it was created ohhh")
                console.log(response.data)
                res(response.data)
            }).catch(err => {
                console.log(err)
                rej(err)
            })
        });
    }

    updateService(store_id: string, data: object): Promise<any> {
        return new Promise(function (res, rej) {
            axiosInstance.post(`services/${store_id}/update`, data).then(response => {
                console.log(response.data)
                res(response.data)
            }).catch(err => {
                console.log(err)
                rej(err)
            })
        });
    }

    pauseService(store_id): Promise<any> {
        console.log(`${store_id}`)

        return new Promise(function (res, rej) {
            axiosInstance.post(`/services/${store_id}/update`, {}).then(response => {
                res(response.data)
            }).then(err => {
                rej(err)
            })
        });
    }

    resumeService(store_id): Promise<any> {

        return new Promise(function (res, rej) {
            axiosInstance.post(`/services/${store_id}/update`, {}).then(response => {
                res(response.data)
            }).then(err => {
                rej(err)
            })
        });
    }

    killService(store_id): Promise<any> {
        return new Promise(function (res, rej) {
            axiosInstance.delete(`/services/${store_id}`, {}).then(response => {
                res(response.data)
            }).then(err => {
                rej(err)
            })
        });
    }
}




export default DockerRestApi
