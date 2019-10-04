let express = require('express');
let init= require('./lib/init')
let model= require('./lib/db/models')
let towerIndex= require('./routes/index')
let app= express();

let bodyP= require('body-parser')


app.use("", towerIndex)

init().then(v=>{

    // completes initialization
    // starting up listening event
    const port= 3060;
    app.listen(port, function () {
        console.log("server started "+port);
    })

})