const { MongoClient, ObjectID } = require('mongodb');
const chalk = require('chalk');
const debug = require('debug')('app:dbConnector');
class HttpConnector {

  async request() {
    try {
      const url = 'mongodb://localhost:27017';
      return await MongoClient.connect(url);
      debug('Connected successfully Mongo');

    } catch (err) {
      debug(`Connected failed ${err}`);

    }

  }
  async insertMany(collection, data, dbName) {
    try {
      const client = await this.request();
      const db = client.db(dbName);
      debug(`check db la gi ${db}`);
      return await db.collection(collection).insertMany(data);
    } catch (err) {
      debug(`insert failed ${err}`);
    };
    client.close();
  }

  async insertUser(collection, user, dbName) {
    try {
      const client = await this.request();
      const db = client.db(dbName);
      debug(`check db la gi ${db}`);
      return await db.collection(collection).insertOne(user);
    } catch (err) {
      debug(`insert failed ${err}`);
    };
    client.close();
  }

  async getAll(dbName,collection) {
    try {
      const client = await this.request();
      const db = client.db(dbName);
      return await db.collection(collection).find().toArray();
    } catch (err) {
      debug(`select Many failed ${err}`);
    };
    client.close();
  }
  async getById(id, dbName,collection) {
    try {
      const client = await this.request();
      const db = client.db(dbName);
      return await db.collection(collection).findOne({_id: new ObjectID(id)});
    } catch (err) {
      debug(`select Many failed ${err}`);
    };
    client.close();
  }
}
module.exports = HttpConnector;
