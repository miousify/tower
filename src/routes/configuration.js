let express= require('express');
let Model= require('../lib/db/models');
let app =express.Router()

const ConfigModel = Model.ConfigModel;
const JobModel= Model.JobModel;
const LogModel= Model.LogModel;

// List all Configurations
app.get("/",async function (req, res) {
    docs=await ConfigModel.find({for:req.params.id}).exec();
    res.json(docs)
})

// Gets a specific plan config
app.get("/:id",async function (req, res) {
    let doc=await ConfigModel.findOne({for:req.params.id}).exec();
    res.json(doc)
})

// Updates a configuration
// Configurations for various plans
/*
* request here is used to upgrade the default configuration
* @properties
* # default image
* # default replicas
* # default resource spec
* */

app.put("/:id",async function () {

    let ConfigModel= model.ConfigModel
    let JobModel = model.JobModel
    let LogModel = model.LogModel

    let log1=await  new LogModel({for:"admin", label:"starting upgrade", message:"about to initiate job."}).save();

    await new ConfigModel.findOne({_id: req.params.id},async function (err, doc){

        try{

            await doc.save();
            let log2=await  new LogModel({for:"admin",
                label:"starting upgrade",
                message:"about to initiate job."}).save();

        }catch (e) {

        }
    });

})

// Adds a new configuration
app.post("/",async function (req, res) {
    let config = {
        type: "server",
        for: "basic", // for plan
        image: "image-name",
        resourceSpec: {
            ram: "",
            storage: "storage",
        }, //
        replicas: 1,
        description: "for basic plan"
    };

    try {
        let respon= await ConfigModel.create(config);
    }catch (e) {
        console.log(e)
    }

    try{
        await LogModel.create({label:"", for:"admin",message:"Plan object updated, successful"})
    }catch (e) {
        console.log(e)
    }
    res.json({success: true})

})

module.exports= app;