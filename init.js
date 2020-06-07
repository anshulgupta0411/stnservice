const mongoClient = require('./lib/MongoDriver');
class Init {

    async initGlobals() {
        console.log("Initializing globals ");
        global.config = require('config');
        global.stringUtil = require('./util/StringUtil');
        global.logger = require('./lib/LogUtil');
      //  global.httpConstants = require('./constants/HTTPConstants');
        global.mongoDriver = new mongoClient();
        
        mongoDriver.connect()
            .then(() => {
                console.log("Connected to mongo sucessfully");
               mongoDriver.createCollection("test");
               mongoDriver.createIndex("test",{aa:1, bb:1});
               Promise.resolve();
            })
            .catch((e) => {
                Promise.reject();
                console.log("Error connecting to mongo " + e);
            });       
    }

    runGC() {
        console.log("Enter - run GC  -- time -->" + new Date().toString());
        if (global.gc) {
            global.gc();
            console.log('After gc ');
        } else {
            console.log('Garbage collection unavailable.  use --expose-gc '
                + 'when launching node to enable forced garbage collection.');
        }
        console.log("Exit  - run GC  -- time -->" + new Date().toString());
        setInterval(this.runGC, config.app.gcInterval);
    }
}

module.exports = new Init();