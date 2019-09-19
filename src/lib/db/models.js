let mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/miousify-tower", function () {
    module.exports.mongoose;
    setup()
})

let JobSchema=new mongoose.Schema({
    storeUniqueKey: String,
    store_id: String,
    plan: String,
    initiator: String,
    token: String,
    createdAt: {
      type: String,
      default: Date.now()
    },
    state:{
        paused: Boolean
    },
    configuration:{
        replicas: String,
        ram: String,
        storage: String,
        domainName: String
    }
});

let ConfigSchema=new mongoose.Schema({
    type: String,
    for: String,
    image: String,
    resourceSpec: {
        ram: String,
        storage: String,
    },
    replicas: Number,
    description: String
});

let JobModel= mongoose.model("job", JobSchema)

let ConfigModel= mongoose.model("config", ConfigSchema)

function setup() {
    ConfigModel.find(function (err, docs) {
        console.log(docs);
        if (docs.length == 1) {

        } else {
            new JobModel({
                storeUniqueKey: "UniqueKey",
                store_id: "Store name",
                plan: "String",
                state: {paused: false, running: Boolean}
            }).save(function (err, doc) {
                console.log('done')
            })
            new ConfigModel({
                type: "minimal",
                for: "plan_id",
                image: "storm:1.0.0",
                resourceSpec: {},
                replicas: 5
            }).save(function (err, doc) {
                console.log("done")
            })
        }
    })

}


module.exports.JobModel= JobModel

module.exports.ConfigModel= ConfigModel