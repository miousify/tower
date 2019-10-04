let express= require('express')
let app =express.Router()
let Model= require('../lib/db/models');
let job =new (require('../lib/job').Job)();

const JobModel= Model.JobModel;
const LogModel= Model.LogModel;

app.get("/",async function (req, res) {
    let jobs=await JobModel.find().exec();
    res.json(jobs);
    // List all jobs

})

app.get("/:id",async function (req, res) {

    let job=await JobModel.findOne({store_id: req.params.id}).exec();
    res.json(job);
    // Get Specific Job
})

app.post("/",async function (req, res) {
    // let data= req.body;
    // console.log(req)
    // console.log(data)
    // //creates job here.

    // cross check to see if job already exist for this store before sending request to add job
    const STORE_ID= "5d975aa6a7af4547bc759fbc";
    let jobCheck=await JobModel.findOne({"storeDetails._id": STORE_ID}).exec()
    console.log(jobCheck)

    if(jobCheck){
        // repsond with appropriate message
        res.json({success:false, message:"Job for this owner already exist"});
        return false
    }

    let createD;
    try{
        createD= await job.createJob({
            // store_id: data._id
            _id: STORE_ID
        });
    }catch (e) {
        console.log(e)
    }

    console.log(createD);

   if(createD){
       res.json({success:true, obj: createD});

       try{
           await new LogModel({message: `Successfull created job for ${STORE_ID}`, for:"admin", type:"creation"}).save()
       }catch (e) {
           res.json(e);
           return ;
       }
   }else {
       res.json({success:false, obj: createD});
   }


    // Add new job
})

app.delete("/:id", async function (req, res) {
    let store_id= req.params.id
    let result= await job.removeJob(store_id);
    console.log(result);
    if(result){
        res.json({success: true});
    }else{
        res.json({success: false})
    }
    // Deletes a job
});

//
//
// // Actions to be passed for owners
// // pause job
// // resume job
// app.post("/:id/actions", function (req, res) {
//
//     // Add new job
// });
//
module.exports= app;