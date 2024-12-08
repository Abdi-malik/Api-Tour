const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  AliasTopFileCheap,
  getTourStats,
  getMonthlyPlan,
  getToursWithIn,
  getDistances
  // checkID,
  // checkBody
} = require('./../controllers/tourController');
const { protect, restrictTo } = require('./../controllers/authController');
const Review = require('./reviewRoutes');
// const { createReview } = require('./../controllers/reviewController');

const router = express.Router();

// router.param('id', checkID);
// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);
router.use('/:tourId/reviews', Review);

router.route('/top-five-cheap').get(AliasTopFileCheap, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithIn);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
