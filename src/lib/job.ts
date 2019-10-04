/// <reference path="./tsmodule/declarations.d.ts"/>
/// <reference path="../../node_modules/axios/index.d.ts"/>

import * as Model from "./db/models.js";
import * as axios from "axios"
import  {Actions} from "./actions"
import Axios from "axios";

interface JobInterface {
    createJob: Function ,
    removeJob: Function,
    updateJob: Function,
    pauseJob: Function,
    resumeJob: Function,
}

interface NewJob {
    _id: String
}

export class Job implements JobInterface{
    static AXIOS = axios.default;

    static getAxiosInstance(){
        return Job.AXIOS.create({baseURL:"http://localhost:5000/api",timeout: 10000, headers:{}})
    }
    async createJob(newJob: NewJob){
        // let planConfig= await Job.getAxiosInstance().get("/admin");
        let axiosRes;
        try{
            axiosRes= await Job.getAxiosInstance().get(`/store/${newJob._id}`);
        }catch (e) {
            console.log("Error occured")
            console.log(e);
            return
        }
        let ownerDetails= axiosRes.data;
        if(ownerDetails._id){
        }else{
            console.log("Store could not be retreived")
            return false
        }

        let jobDoc;

       try {
           jobDoc= await Model.JobModel.create({
               _id: ownerDetails.store_id,
               storeDetails: ownerDetails,
               store_id: ownerDetails.store_id,
               initiatore:"miousify",
               plan: ""
           });
           console.log("Job added to datastore");
       }catch (e) {
           console.log(e);
           throw Error("Could not successfully add Job to store")
           return ;
       }

        let actions: Actions = new Actions();
        let jobRes;

        console.log("starting service");
        try{
             jobRes= await  actions.startService(ownerDetails.store_id, "");
             console.log(jobRes);
            await JobModel.updateOne({_id: jobDoc._id}, {service: {id:  jobRes.ID}} )
        }catch (e) {
            console.log(e)
        }
        if(jobRes){
            // successfull.
            return jobRes;
        }else{
            //something went wrong.
            return false
        }
    }

    async  removeJob (store_id){
        let actions : Actions= new Actions();
        let checkKillS= await actions.killService(store_id);
        let checkDeleteJob= await  Model.JobModel.deleteOne({store_id: store_id}).exec();
        if(checkDeleteJob && checkKillS){
            return true
        }else{

        }
    }
    updateJob(){

    }
    pauseJob(){

    }
    resumeJob(){

    }
    async runUpgrade (){

       let jobs= await Model.JobModel.find().exec();
       jobs.forEach(async v=>{

           let actions : Actions= new Actions();
           let res= await actions.updateService(v.store_id);

           console.log("Updated")
       })


    }
}

