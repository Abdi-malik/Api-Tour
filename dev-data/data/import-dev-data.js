const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewsModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<db_password>', process.env.PASSWORD);
mongoose
  .connect(DB)
  // .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection established'));

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf8'));
const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json', 'utf8'));
const reviews = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json', 'utf8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('data loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(tours);

// deleteData();
// importData();
