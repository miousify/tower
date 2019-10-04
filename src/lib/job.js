"use strict";
/// <reference path="./tsmodule/declarations.d.ts"/>
/// <reference path="../../node_modules/axios/index.d.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model = require("./db/models.js");
const axios = require("axios");
const actions_1 = require("./actions");
class Job {
    static getAxiosInstance() {
        return Job.AXIOS.create({ baseURL: "http://localhost:5000/api", timeout: 10000, headers: {} });
    }
    createJob(newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            // let planConfig= await Job.getAxiosInstance().get("/admin");
            let axiosRes;
            try {
                axiosRes = yield Job.getAxiosInstance().get(`/store/${newJob._id}`);
            }
            catch (e) {
                console.log("Error occured");
                console.log(e);
                return;
            }
            let ownerDetails = axiosRes.data;
            if (ownerDetails._id) {
            }
            else {
                console.log("Store could not be retreived");
                return false;
            }
            let jobDoc;
            try {
                jobDoc = yield Model.JobModel.create({
                    _id: ownerDetails.store_id,
                    storeDetails: ownerDetails,
                    store_id: ownerDetails.store_id,
                    initiatore: "miousify",
                    plan: ""
                });
                console.log("Job added to datastore");
            }
            catch (e) {
                console.log(e);
                throw Error("Could not successfully add Job to store");
                return;
            }
            let actions = new actions_1.Actions();
            let jobRes;
            console.log("starting service");
            try {
                jobRes = yield actions.startService(ownerDetails.store_id, "");
                console.log(jobRes);
                yield JobModel.updateOne({ _id: jobDoc._id }, { service: { id: jobRes.ID } });
            }
            catch (e) {
                console.log(e);
            }
            if (jobRes) {
                // successfull.
                return jobRes;
            }
            else {
                //something went wrong.
                return false;
            }
        });
    }
    removeJob(store_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let actions = new actions_1.Actions();
            let checkKillS = yield actions.killService(store_id);
            let checkDeleteJob = yield Model.JobModel.deleteOne({ store_id: store_id }).exec();
            if (checkDeleteJob && checkKillS) {
                return true;
            }
            else {
            }
        });
    }
    updateJob() {
    }
    pauseJob() {
    }
    resumeJob() {
    }
    runUpgrade() {
        return __awaiter(this, void 0, void 0, function* () {
            let jobs = yield Model.JobModel.find().exec();
            jobs.forEach((v) => __awaiter(this, void 0, void 0, function* () {
                let actions = new actions_1.Actions();
                let res = yield actions.updateService(v.store_id);
                console.log("Updated");
            }));
        });
    }
}
Job.AXIOS = axios.default;
exports.Job = Job;
//# sourceMappingURL=job.js.map