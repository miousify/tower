let express= require('express')
let path= require("path");

let config= require('./configuration');
let jobs= require('./jobs');
let services= require('./services');

let nunjucks= require('nunjucks')
let app =express()
// set up ui stuff
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'), {autoescape: true});
env.express(app);

app.use("/configurations", config);

app.use("/jobs", jobs);

app.use("/services",  services);

module.exports= app