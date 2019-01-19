/**
 * Module dependencies
 */
const mongo = require('../clients/MongoDB');
const logger = require('winston-this')('PokemonService');

class PokemonService {
  getAll(limit = 20, offset = 0, filters = {}) {
    return new Promise((resolve, reject) => {
      // Connect to Database
      mongo.connect().then(({ client, db }) => {
        logger.info('Getting pokemon collection');

        const collection = db.collection('pokemon');

        logger.info('Finding all Pokemons');

        const query = {
          id: {
            $lte: 150,
          },
        };

        if (filters.types) {
          query.types = {
            $in: [filters.types],
          };
        }

        collection.find(query)
          .sort({
            id: 1,
          })
          .skip(offset)
          .limit(limit)
          .toArray()
          .then((res) => {
            // Deconstruct and remove the _id provided by MongoDB
            const {
              _id,
              ...rest
            } = res;

            const pokemons = res.map((el) => {
              const {
                _id,
                ...pk
              } = el;

              return pk;
            });

            mongo.close(client);
            resolve(pokemons);
          })
          .catch((res) => {
            mongo.close(client);
            reject(res);
          });
      });
    });
  }

  getPokemon(id) {
    return new Promise((resolve, reject) => {
      // Connect to Database
      mongo.connect().then(({ client, db }) => {
        logger.info(`Getting pokemon with id ${id}`);

        const collection = db.collection('pokemon');

        logger.info('Finding all Pokemons');

        collection.find({
          id: id,
        })
          .toArray()
          .then((res) => {
            // Deconstruct and remove the _id provided by MongoDB
            const {
              _id,
              ...rest
            } = res;

            const pokemons = res.map((el) => {
              const {
                _id,
                ...pk
              } = el;

              return pk;
            });

            mongo.close(client);
            resolve(pokemons[0]);
          })
          .catch((res) => {
            mongo.close(client);
            reject(res);
          });
      });
    });
  }
}

module.exports = new PokemonService();
