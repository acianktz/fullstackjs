/**
 * Module dependencies
 */
const mongo = require('../clients/MongoDB');
const logger = require('winston-this')('TypesService');

class TypesService {
  getAll() {
    return new Promise((resolve, reject) => {
      // Connect to Database
      mongo.connect().then(({ client, db }) => {
        logger.info('Getting types');

        const collection = db.collection('types');

        logger.info('Finding all types');

        collection.find({})
          .sort({
            id: 1,
          })
          .toArray()
          .then((res) => {
            // Deconstruct and remove the _id provided by MongoDB
            const {
              _id,
              ...rest
            } = res;

            const types = res.map((el) => {
              const {
                _id,
                ...pk
              } = el;

              return pk;
            });

            mongo.close(client);
            resolve(types);
          })
          .catch((res) => {
            mongo.close(client);
            reject(res);
          });
      });
    });
  }
}

module.exports = new TypesService();
