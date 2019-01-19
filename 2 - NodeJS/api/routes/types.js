/**
 * Module dependencies
 */
const router = require('express').Router();
const TypesService = require('../services/TypesService');

router.get('/', (req, res) => {
  TypesService.getAll().then(types => {
    res.status(200).json({
      results: types,
    });
  }).catch(error => {
    next(error);
  });
});

module.exports = router;
