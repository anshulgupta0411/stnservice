class BaseDao {

    constructor() {

    }

    find(collectionName, query) {

        return new Promise((resolve, reject) => {
            console.log(`BaseDao::find - collectionName : ${collectionName}, query : ${query} `);
            mongoDriver.find(collectionName, query)
                .then(data => {
                    console.log(`BaseDao::find - collectionName : ${collectionName}, query : ${query}, data : ${data} `);
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });
    }

    findOne(collectionName, query) {

        return new Promise((resolve, reject) => {
            console.log(`BaseDao::find - collectionName : ${collectionName}, query : ${query} `);
            mongoDriver.findOne(collectionName, query)
                .then(data => {
                    console.log(`BaseDao::find - collectionName : ${collectionName}, query : ${query}, data : ${data} `);
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });
    }

    findById(collectionName, id) {
        console.log(`BaseDao::findById - collectionName : ${collectionName}, id : ${id} `);
        return new Promise((resolve, reject) => {
            mongoDriver.findById(collectionName, id)
                .then(data => {
                    console.log(`BaseDao::find - collectionName : ${collectionName}, id : ${id}, data : ${data} `);
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });
    }

    save(collectionName, objArr, additionalProps) {
        console.log(`BaseDao::save - collectionName : ${objArr}`);
        return new Promise((resolve, reject) => {
            mongoDriver.save(collectionName, objArr, additionalProps)
                .then(data => {
                    console.log(`BaseDao::save - collectionName : success`);
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });
    }

    updateById(collectionName, obj, id) {

        return new Promise((resolve, reject) => {
            mongoDriver.updateById(collectionName, obj, id)
                .then(data => {
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });

    }

    update(collectionName, obj, params) {

        return new Promise((resolve, reject) => {
            mongoDriver.update(collectionName, obj, params)
                .then(data => {
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });

    }

    deleteById(collectionName, entityId) {
        return new Promise((resolve, reject) => {
            mongoDriver.deleteById(collectionName, entityId)
                .then(data => {
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });

    }

    delete(collectionName, query) {
        return new Promise((resolve, reject) => {
            mongoDriver.delete(collectionName, query)
                .then(data => {
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });

    }

    upsert(collectionName, query, record, additionalProps) {
        return new Promise((resolve, reject) => {
            mongoDriver.upsert(collectionName, query, record, additionalProps)
                .then(data => {
                    resolve(data);
                }).catch(e => {
                    reject(e);
                });
        });
    }

}

module.exports = BaseDao;