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

        // Create query and limit the query to 150
        const query = {
          id: {
            $lte: 150,
          },
        };

        // Add type filter
        if (filters.types) {
          query.types = {
            $in: [filters.types],
          };
        }

        // Make query
        collection.aggregate([
          {
            "$match": query
          },
          {
            "$facet": {
              "results": [
                {
                  "$skip": offset
                },
                {
                  "$limit": limit
                }
              ],
              "count": [
                {
                  "$count": "count"
                }
              ]
            }
          }
        ])
          .sort({
            id: -1,
          })
          .toArray()
          .then((res) => {
            const data = res[0];

            const pokemons = data.results.map((el) => {
              const {
                _id,
                ...pk
              } = el;

              return pk;
            });

            mongo.close(client);

            const count = data.count[0].count;

            resolve({
              pokemons: pokemons,
              count: count,
              prev: offset > 0,
              next: (count - (offset + limit)) > 0
            });
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
