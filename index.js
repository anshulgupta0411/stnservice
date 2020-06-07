// Import required modules
const express  = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const init = require('./init');
(
    async function () {
        return await init.initGlobals().then(() =>{
            init.runGC();
        });
    }
)()

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    console.log(result); // "done!"
  }

f();

//necessary for REST API
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb',extended :  true}));
app.use(methodOverride('X-HTTP-Method-Override'));

//add CORS support
app.use(function (req, res, next) {
    console.log(" Adding the CORS support inside the initializing funtion ");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(config.app.port, () => {
    console.log(`started the service at ${config.app.port}`);
});

app.use('/stn', require('./routes/Routes'));

/*app.use((req, res, next) => {

    var oldSend = res.send;
    console.log(" Inside the middleware %j", res.json);
    res.send = function (data) {
        arguments[0] = "modified : " + arguments[0];
        // res.send=oldSend
        oldSend.apply(res, arguments);
    }
    next();
});
*/