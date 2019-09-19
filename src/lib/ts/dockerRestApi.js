"use strict";
/// <reference path="../../../node_modules/axios/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var axiosInstance = axios.default.create({
    baseURL: "http://0.0.0.0:2375/v1.40"
});
///v1.18
var DockerRestApi = /** @class */ (function () {
    function DockerRestApi() {
    }
    DockerRestApi.prototype.createService = function (data) {
        return new Promise(function (res, rej) {
            axiosInstance.post("/services/create", data).then(function (response) {
                console.log("it was created ohhh");
                console.log(response.data);
                res(response.data);
            }).catch(function (err) {
                console.log(err);
                rej(err);
            });
        });
    };
    DockerRestApi.prototype.updateService = function (store_id, data) {
        return new Promise(function (res, rej) {
            axiosInstance.post("services/" + store_id + "/update", data).then(function (response) {
                console.log(response.data);
                res(response.data);
            }).catch(function (err) {
                console.log(err);
                rej(err);
            });
        });
    };
    DockerRestApi.prototype.pauseService = function (store_id) {
        console.log("" + store_id);
        return new Promise(function (res, rej) {
            axiosInstance.post("/services/" + store_id + "/update", {}).then(function (response) {
                res(response.data);
            }).then(function (err) {
                rej(err);
            });
        });
    };
    DockerRestApi.prototype.resumeService = function (store_id) {
        return new Promise(function (res, rej) {
            axiosInstance.post("/services/" + store_id + "/update", {}).then(function (response) {
                res(response.data);
            }).then(function (err) {
                rej(err);
            });
        });
    };
    DockerRestApi.prototype.killService = function (store_id) {
        return new Promise(function (res, rej) {
            axiosInstance.delete("/services/" + store_id, {}).then(function (response) {
                res(response.data);
            }).then(function (err) {
                rej(err);
            });
        });
    };
    return DockerRestApi;
}());
exports.default = DockerRestApi;
//# sourceMappingURL=dockerRestApi.js.map