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
const dockerRestApi_1 = require("./dockerRestApi");
const ServiceData = require("./data/ServiceData.js");
const ServiceUpdateData = require("./data/ServiceUpdateData.js");
class Actions {
    startService(owner_id, plan) {
        return __awaiter(this, void 0, void 0, function* () {
            // find plan config.
            let configData = yield Model.ConfigModel.findOne().exec(); //get config to make use of
            let defaultData = ServiceData;
            defaultData.TaskTemplate.ContainerSpec.Image = configData.image;
            defaultData.Name = owner_id;
            defaultData.Mode.Replicated = { Replicas: configData.replicas };
            new dockerRestApi_1.default().createService(defaultData).then(resolved => {
                Model.JobModel.update({ store_id: owner_id }, { state: { running: true } }).exec();
                console.log("notify user");
                //notify owner of what has just happened;
            }).catch(rejected => {
                console.log("could not complete task");
            });
            return true;
        });
    }
    pauseService(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let configData = yield Model.ConfigModel.findOne().exec();
            let defaultData = ServiceUpdateData;
            defaultData.TaskTemplate.ContainerSpec.Image = configData.image;
            defaultData.Name = "storenameoh";
            defaultData.Mode.Replicated = { Replicas: 0 };
            new dockerRestApi_1.default().updateService("storenameoh", defaultData).then(resolved => {
                Model.JobModel.updateOne({ store_id: owner_id }, { state: { paused: true, running: false } }).exec();
                //notify owner of what has just happened;
            }).then(rejected => {
            });
            return true;
        });
    }
    resumeService(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let configData = yield Model.ConfigModel.findOne().exec();
            let defaultData = ServiceUpdateData;
            defaultData.TaskTemplate.ContainerSpec.Image = configData.image;
            defaultData.Name = owner_id;
            defaultData.Mode.Replicated = { Replicas: configData.replicas };
            new dockerRestApi_1.default().updateService(owner_id, defaultData).then(resolved => {
                Model.JobModel.updateOne({ store_id: owner_id }, { state: { paused: true, running: false } }).exec();
                //notify owner of what has just happened;
            }).then(rejected => {
            });
            return true;
        });
    }
    killService(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield new dockerRestApi_1.default().killService(owner_id);
            if (res) {
                return res;
            }
            return;
        });
    }
    updateService(owner_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let configData = yield Model.ConfigModel.findOne().exec();
            let defaultData = ServiceUpdateData;
            defaultData.TaskTemplate.ContainerSpec.Image = configData.image;
            defaultData.Name = owner_id;
            // defaultData.Mode.Replicated={Replicas: configData.replicas }
            let res = yield new dockerRestApi_1.default().updateService(owner_id, defaultData);
            if (res) {
                return res;
            }
            return;
        });
    }
    upgradeServicesImage() {
        return;
    }
    getAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            let services = yield new dockerRestApi_1.default().getServices();
            return services;
        });
    }
}
exports.Actions = Actions;
//# sourceMappingURL=actions.js.map