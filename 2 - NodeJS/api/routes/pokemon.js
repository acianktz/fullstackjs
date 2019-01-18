/**
 * Module dependencies
 */
const router = require('express').Router();
const PokemonService = require('../services/PokemonService');

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  PokemonService.getAll(limit, offset).then((pokemons) => {
    res.status(200).json({
      results: pokemons,
    });
  }).catch((error) => {
    res.status(500).send(error);
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  PokemonService.getPokemon(id).then((pokemon) => {
    res.status(200).json(pokemon);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

module.exports = router;
