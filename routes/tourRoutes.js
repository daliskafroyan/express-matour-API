const express = require('express');
const tourRoute = require('./../controllers/tourController');

const router = express.Router();

router
  .route('/')
  .get(tourRoute.getAllTours)
  .post(tourRoute.postATour);
router
  .route('/:id')
  .get(tourRoute.getATour)
  .patch(tourRoute.editATour)
  .delete(tourRoute.deleteATour);

module.exports = router;
