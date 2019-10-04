let express= require('express')
let app =express.Router()
let Model= require('../lib/db/models');
let job =new (require('../lib/job').Job)();
let actions= require('../lib/actions');

const JobModel= Model.JobModel;
const LogModel= Model.LogModel;

app.get("/",async function (req, res) {

    // List services here
    //
})

app.get("/",async function (req, res) {

    // Show single service here for inspection
    //
})

module.exports= app;