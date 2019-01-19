/**
 * Module dependencies
 */
const mongo = require('../clients/MongoDB');
const logger = require('winston-this')('TypesService');

class TypesService {
  getAll() {
    logger.info('Getting all types');

    // Connect to Database
    return mongo.connect().then(({ client, db }) => {
      const collection = db.collection('types');

      return collection.find({})
        .sort({
          id: 1,
        })
        .toArray()
        .then((res) => {
          mongo.close(client);

          const types = res.map(type => {
            // Deconstruct and remove the _id provided by MongoDB
            const {
              _id,
              ...others
            } = type;

            return others;
          });

          return Promise.resolve(types);
        })
        .catch(err => {
          mongo.close(client);
          return Promise.reject(err);
        });
    });
  }
}

module.exports = new TypesService();
