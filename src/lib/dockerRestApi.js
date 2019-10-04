"use strict";
/// <reference path="../../node_modules/axios/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
let axiosInstance = axios.default.create({
    baseURL: "http://0.0.0.0:2375/v1.40"
});
///v1.18
class DockerRestApi {
    createService(data) {
        return new Promise(function (res, rej) {
            axiosInstance.post("/services/create", data).then(response => {
                console.log("it was created ohhh");
                console.log(response.data);
                res(response.data);
            }).catch(err => {
                console.log(err);
                rej(err);
            });
        });
    }
    updateService(store_id, data) {
        return new Promise(function (res, rej) {
            // get current service version before update
            axiosInstance.get(`services/${store_id}`).then(getRes => {
                let version = getRes.data.Version.Index;
                axiosInstance.post(`services/${store_id}/update?version=${version}`, data).then(response => {
                    console.log(response.data);
                    res(response.data);
                }).catch(err => {
                    console.log(err);
                    rej(err);
                });
            }).catch(err => console.log(err));
        });
    }
    pauseService(store_id) {
        console.log(`${store_id}`);
        return new Promise(function (res, rej) {
            axiosInstance.post(`/services/${store_id}/update`, {}).then(response => {
                res(response.data);
            }).then(err => {
                rej(err);
            });
        });
    }
    resumeService(store_id) {
        return new Promise(function (res, rej) {
            axiosInstance.post(`/services/${store_id}/update`, {}).then(response => {
                res(response.data);
            }).then(err => {
                rej(err);
            });
        });
    }
    killService(store_id) {
        return new Promise(function (res, rej) {
            axiosInstance.delete(`/services/${store_id}`, {}).then(response => {
                res(response.data);
            }).then(err => {
                rej(err);
            });
        });
    }
    getServices() {
        return new Promise(function (res, rej) {
            axiosInstance.get(`/services`, {}).then(response => {
                res(response.data);
            }).then(err => {
                rej(err);
            });
        });
    }
}
exports.default = DockerRestApi;
//# sourceMappingURL=dockerRestApi.js.map