let Model= require('../lib/db/models');
let Actions= require('../lib/actions').Actions;
const JobModel= Model.JobModel;
const LogModel= Model.LogModel;

module.exports=async function (){
    console.log("Started")
    let jobs=await JobModel.find().exec();

    let actions= new Actions();
    let services = await actions.getAllServices();
};