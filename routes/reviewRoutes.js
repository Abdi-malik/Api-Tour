const express = require('express');

const { protect, restrictTo } = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    protect,
    restrictTo('user'),
    reviewController.setTourUser,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports = router;
