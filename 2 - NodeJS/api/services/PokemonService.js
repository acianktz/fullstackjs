/**
 * Module dependencies
 */
const mongo = require('../clients/MongoDB');
const logger = require('winston-this')('PokemonService');

class PokemonService {
  /**
   * Get all Pokemons
   *
   * @param limit the number of pokemons to return
   * @param offset start number from results on collection
   * @param filters filters to apply
   * @returns Promise
   */
  getAll(limit = 20, offset = 0, filters = {}) {
    logger.info(`Getting all pokemons [limit=${limit}] offset=${offset} filters=${JSON.stringify(filters)}`);

    // Connect to Database
    return mongo.connect()
      .then(({ client, db }) => {
        const collection = db.collection('pokemon');

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
        return collection.aggregate([
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
          .then(results => {
            // Close database connection
            mongo.close(client);

            const data = results[0];

            const pokemons = data.results.map(pokemon => {
              const {
                _id,
                weight,
                height,
                ...others
              } = pokemon;

              return {
                weight: Math.round(weight * 0.1), // Convert to kilograms
                height: (height * 10), // Convert to centimeters
                others,
              };
            });

            const count = data.count[0].count;

            return Promise.resolve({
              pokemons: pokemons,
              count: count,
              prev: offset > 0,
              next: (count - (offset + limit)) > 0
            });
          })
          .catch(err => {
            // Close database connection
            mongo.close(client);
            return Promise.reject(err);
          });
      });
  }

  /**
   * Get Pokemon from id
   *
   * @param id
   * @returns Promise
   */
  getPokemon(id) {
    // Connect to Database
    return mongo.connect().then(({ client, db }) => {
      logger.info(`Getting pokemon with id ${id}`);

      const collection = db.collection('pokemon');

      logger.info('Finding all Pokemons');

      return collection.find({
        id: id,
      })
        .toArray()
        .then(results => {
          // Close connection
          mongo.close(client);

          const pokemons = results.map(pokemon => {
            // Deconstruct and remove the _id provided by MongoDB
            const {
              _id,
              ...others
            } = pokemon;

            return others;
          });

          return Promise.resolve(pokemons[0]);
        })
        .catch(err => {
          mongo.close(client);

          return Promise.reject(err);
        });
    });
  }
}

module.exports = new PokemonService();
