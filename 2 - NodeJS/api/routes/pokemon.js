/**
 * Module dependencies
 */
const router = require('express').Router();
const PokemonService = require('../services/PokemonService');

router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  const filters = {
    types: req.query.types,
  };

  PokemonService.getAll(limit, offset, filters).then(data => {
    res.status(200).json({
      results: data.pokemons,
      total: data.count,
      prev: data.prev,
      next: data.next,
    });
  }).catch(error => {
    next(error);
  });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  PokemonService.getPokemon(id).then(pokemon => {
    res.status(200).json(pokemon);
  }).catch(error => {
    next(error);
  });
});

module.exports = router;
