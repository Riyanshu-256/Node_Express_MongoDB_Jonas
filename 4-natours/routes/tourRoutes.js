// tourRoutes.js (Controller + Router)
const express = require('express');
const tourController = require('./../controllers/tourController');

// Router
const router = express.Router();

router.param('id', (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    next();
})

// router.use(exports.addRequestTime); // Add requestTime to all routes

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
