
/// <reference path="../tsmodule/declarations.d.ts"/>
/// <reference path="../../../node_modules/axios/index.d.ts"/>

import * as Model from "../db/models.js";
import * as axios from "axios"
import Axios from "axios";

interface JobInterface {
    createJob: Function ,
    removeJob: Function,
    updateJob: Function,
    pauseJob: Function,
    resumeJob: Function,
}

interface NewJob {
    _id: String,
    store_id: String,
    plan: String,
    config: String,
    creator: String
}

class Job implements JobInterface{

    static AXIOS = axios.default;

    static getAxiosInstance(){
        return Job.AXIOS.create({baseURL:"",httpAgent:"",timeout: 2000, headers:{}})
    }
    
    async createJob(newJob: NewJob){
        // check job status

        let planConfig= await Job.getAxiosInstance().get("/admin")

        let ownerDetails= await Job.getAxiosInstance().get(`/store/${newJob._id}`)
        // Check if expired
        // if not expired begin process;

        new Model.JobModel().save( function (err, doc) {
            
        })



    }

    removeJob (){

    }

    updateJob(){

    }

    pauseJob(){

    }

    resumeJob(){

    }
}

new Job()

