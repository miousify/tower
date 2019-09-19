let express = require('express');
let init= require('./lib/init')
let job = require('./lib/job')
let app= express();

async  function createJob (){
    let data= req.body;
    data= req.data;
    //creates job here.
    job.startJob({
        store_id: "Store id",
        expires_at: Date.now(),
        plan: "plan",
        unlimited: ""
    });
    res.json({success:true})
}
app.post("/register", async function (req, res) {
    //owner to whom this service is created
    // defined configuation is not available default is used
    // this service would be available if the plan service is active in either the planOwnedservices of that userdefined Services
    // else it deactivates its self.
}, createJob);

app.post("/add", createJob)

app.get(["/unregister","/stop"], async function () {
    // stopes the service for this owner here
})

app.post("/service/pause", function () {

})

// resumes from state
app.post("/owner/resume", function () {

})

/*
* request here is used to upgrade the default configuration
* @properties
* # default image
* # default replicas
* # default resource spec
* */
app.post("/admin/upgrade", function (){

})

/*
* request here is used to upgrade the default configuration for a plan
* @properties
* # default image
* # default replicas
* # default resource spec
* */
app.post("/admin/upgradePlanDefault", function () {

})


app.get("/admin/list", function (){

})

init().then(v=>{

    // completes initialization
    // starting up listening event
    app.listen("", function () {

    })

})