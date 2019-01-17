/**
 * Module dependencies
 */
const router = require('express').Router();
const PokemonService = require('../services/PokemonService');

router.get('/', (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;

  PokemonService.getAll(limit, offset).then((pokemons) => {
    res.status(200).json({
      results: pokemons,
    });
  }).catch((error) => {
    res.status(500).send(error);
  });
});

module.exports = router;
