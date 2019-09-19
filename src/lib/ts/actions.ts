
/// <reference path="../tsmodule/declarations.d.ts"/>
/// <reference path="../../../node_modules/axios/index.d.ts"/>

import * as Model from "../db/models.js";
import * as axios from "axios"
import DockerRestApi from "./dockerRestApi"

import * as ServiceData from "../data/ServiceData.js"
import * as ServiceUpdateData from "../data/ServiceUpdateData.js"

interface ActionInterface {
    startService(owner_id: String ): Promise<any>,
    killService(owner_id: String): Promise<any>,
    pauseService(owner_id: String): Promise<any>,
    resumeService(owner_id: String): Promise<any>,
    upgradeServicesImage(): Promise<any>
}

class Actions  implements ActionInterface {

    async startService(owner_id: String): Promise<any> {
        let configData=await Model.ConfigModel.findOne().exec();
        let defaultData= ServiceData;
        defaultData.TaskTemplate.ContainerSpec.Image=configData.image
        defaultData.Name= owner_id
        defaultData.Mode.Replicated={Replicas: configData.replicas }
        new DockerRestApi().createService(defaultData).then(resolved=>{
            Model.JobModel.update({store_id: owner_id}, {state: {running: true}}).exec()
            console.log("notify user")
            //notify owner of what has just happened;
        }).catch(rejected=>{
            console.log("could not complete task")
        })
        return true
    }

    async pauseService(owner_id: string ): Promise<any> {

        let configData=await Model.ConfigModel.findOne().exec();
        let defaultData= ServiceUpdateData;
        defaultData.Mode.Replicated={Replicas: 0 }
        new DockerRestApi().updateService("storenameoh",defaultData).then(resolved=>{
            Model.JobModel.update({store_id: owner_id}, {state: {paused: true, running: false}}).exec()
            //notify owner of what has just happened;
        }).then(rejected=>{
        })
        return true
    }

    async resumeService(owner_id: string): Promise<any> {
        let configData=await Model.ConfigModel.findOne().exec();
        let defaultData= ServiceUpdateData;
        defaultData.Mode.Replicated={Replicas: configData.replicas }
        new DockerRestApi().updateService(owner_id,defaultData).then(resolved=>{
            Model.JobModel.update({store_id: owner_id}, {state: {running: true, paused: false}}).exec()
            //notify owner of what has just happened;
        }).then(rejected=>{

        })
        return
    }

    killService(owner_id: String): Promise<any> {

        new DockerRestApi().killService(owner_id).then(fulfilled=>{
            Model.JobModel.deleteOne({store_id: owner_id}).exec()
        }).catch(resjected=>{

        })
        return
    }

    upgradeServicesImage(): Promise<any> {



        return
    }

}


new Actions().pauseService("Store name")