const Review = require('./../models/reviewsModel');
const factor = require('./controllerFactor');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/AppError');

exports.setTourUser = async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factor.getAll(Review);
exports.getReview = factor.getOne(Review);
exports.createReview = factor.createOne(Review);
exports.updateReview = factor.updateOne(Review);
exports.deleteReview = factor.deleteOne(Review);
