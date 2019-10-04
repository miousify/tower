let mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/miousify-tower", function () {
    module.exports.mongoose;

})

let JobSchema=new mongoose.Schema({
    _id: String,
    storeDetails: mongoose.Schema.Types.Mixed,

    service: {
        id: String
    },
    store_id: String,
    initiator: String,
    token: String,
    createdAt: {
      type: String,
      default: Date.now()
    },
    isInitiated: Boolean,
    state:{
        paused: Boolean,
        running: Boolean,
        killed: Boolean,
        updateing: Boolean
    }
});

let ConfigSchema=new mongoose.Schema({
    type: String,
    for: {type:String, unique: true}, // for plan
    image: String,
    resourceSpec: {
        ram: String,
        storage: String,
    }, //
    replicas: Number,
    description: String
});

let LogSchema=new mongoose.Schema({
    label: String,
    for: String,
    message: String,
    createdAt:{
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
});

let LogModel= mongoose.model("log", JobSchema)


let JobModel= mongoose.model("job", JobSchema)

let ConfigModel= mongoose.model("config", ConfigSchema)

module.exports.LogModel= LogModel

module.exports.JobModel= JobModel

module.exports.ConfigModel= ConfigModel