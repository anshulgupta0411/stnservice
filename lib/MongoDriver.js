const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

class MongoDriver {

    getDb() {
        return this.db;
    }
    setDb(database) {
        this.db = database;
    }
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.mdbConfig.connectString, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
                if (err) reject(err);
                let dbase = db.db(config.mdbConfig.dbName);
                this.setDb(dbase);
                resolve();
            });
        })
    }

    createCollection = function (collectionName, options) {
        this.getDb().createCollection(collectionName, options);
    };

    getCollection = function (collectionName) {
        console.log(`MongoDriver::getCollection , collectionName = ${collectionName}`);
        return new Promise((resolve, reject) => {
            this.db.collection(collectionName, function (error, the_collection) {
                if (error) {
                    console.log(`MongoDriver::getCollection , collectionName = ${collectionName}, error = ${error}`);
                    reject(error);
                }
                else {
                    console.log(`MongoDriver::getCollection , the_collection = ${the_collection}`);
                    resolve(the_collection);
                }
            });
        });
    };

    createIndex = function (collectionName, index, options) {
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName).then((collection) => {
                collection.createIndex(index, options, function (error, results) {
                    if (error) {
                        logger.debug('index creation failed .. %j', error);
                        logger.debug('index creation failed on %s', collectionName);
                        logger.debug('while creating index %s', index)
                        reject(error);
                    } else {
                        logger.debug("Index creation success.. %s", index);
                        resolve(results);
                    }
                });
            }).catch((e) => {
                reject(e);
            });
        });
    };

    find = function (collectionName, query) {
        console.log("MongoDriver::find , collectionName = %s , query = %j", collectionName, query);
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName).then((collection) => {
                collection.find(query).toArray(function (err, results) {
                    if (err) {
                        console.log(`MongoDriver::find , error = ${err}`);
                        reject(err);
                    } else {
                        console.log(`MongoDriver::find , results = %j`, results);
                        resolve(results);
                    }
                });
            }).catch((e) => {
                reject(e);
            });
        });
    };

        
    findOne = function (collectionName, query) {
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName).then((collection) => {
                let doc = collection.findOne(query);
                resolve(doc);
            }).catch((e) => {
                reject(e);
            });
        });
    };

    findById = function (collectionName, id) {
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName).then((collection) => {
                let checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
                if (!checkForHexRegExp.test(id)) reject({ message: "Id must be alphanumeric 24 characters long" });
                let doc = collection.findOne({ '_id': ObjectID(id) });
                resolve(doc);
            }).catch((e) => {
                reject(e);
            });
        });
    };

    //insert multiple records with timestamp
    save = function (collectionName, objArr, additionalProps) {

        if (typeof objArr === 'object') objArr = [objArr];
        additionalProps = additionalProps || {};
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName)
                .then((the_collection) => {
                    let epochTime = Date.now();
                    let expiryDate = new Date(epochTime);
                    let arr = [];
                    for (var i = 0; i < objArr.length; i++) {
                        objArr[i].created_on = expiryDate;
                        objArr[i].modified_on = expiryDate;
                        //These are additional properties that needs to be added to collection
                        for (var key in additionalProps) {
                            objArr[i][key] = additionalProps[key];
                        }
                        arr.push(objArr[i]);
                    }
                    the_collection.insertMany(arr, { keepGoing: 1 }, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });

                })
                .catch((e) => {
                    reject(e);
                });
        });
    };

    //update a object by id
    updateById = function (collectionName, obj, id) {
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName).then((the_collection) => {
                obj.modified_on = new Date();
                console.log(" id =  %j", id);
                the_collection.update({ '_id': ObjectID(id) }, { $set: obj }, {}, function (error, doc) {
                    if (error) reject(error);
                    else resolve(doc);
                });
            })
                .catch((e) => {
                    reject(e);
                });
        });
    };

    //update object
    update = function (collectionName, obj, params) {
        
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName)
                .then((the_collection) => {
                    the_collection.updateMany(params, {$set : obj}, { upsert: false, safe: false }, function (error, doc) {
                        if (error) reject(error);
                        else resolve(doc);
                    });
                }).catch(e => {
                    reject(e);
                });
        });
    };

    deleteById = function (collectionName, id) {

        return new Promise((resolve, reject) => {
            this.getCollection(collectionName)
                .then((the_collection) => {
                    the_collection.remove({ '_id': ObjectID(id) }, function (error, doc) {
                        if (error) reject(error);
                        else resolve(doc);
                    });
                }).catch(e => {
                    reject(e);
                });
        });
    };

    delete = function (collectionName, query) {

        return new Promise((resolve, reject) => {
            this.getCollection(collectionName)
                .then((the_collection) => {
                    the_collection.remove(query, function (error, doc) {
                        if (error) reject(error);
                        else resolve(doc);
                    });
                }).catch(e => {
                    reject(e);
                });
        });
    }

    //upsert multiple records with timestamp
    upsert = function (collectionName, query, record, additionalProps) {

        additionalProps = additionalProps || {};
        return new Promise((resolve, reject) => {
            this.getCollection(collectionName)
                .then((the_collection) => {
                    the_collection.update(query, record, { upsert: true, safe: false }, function (err, data) {
                        if (error) reject(error);
                        else resolve(doc);
                    });
                }).catch(e => {
                    reject(e);
                });
        });
    };
}
module.exports = MongoDriver;