const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const factor = require('./controllerFactor');

const filteredObj = (obj, ...allowedFeildes) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFeildes.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route is not for password update. please to update your password use /updatePassword'
      )
    );
  }

  const filteredBody = filteredObj(req.body, 'email', 'name');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not  defined. use /signup instead'
  });
};

exports.getAllUsers = factor.getAll(User);
exports.getUser = factor.getOne(User);
exports.updateUser = factor.updateOne(User);
exports.deleteUser = factor.deleteOne(User);
