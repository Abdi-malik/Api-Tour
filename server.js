const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 🔥 shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<db_password>', process.env.PASSWORD);
mongoose
  .connect(DB)
  // .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection established'));

// console.log(process.env);

// const testTour = new Tour({
//   rating: 5.7,
//   price: 'Abdimalik'
// });

// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log('error!', err.message);
//     console.log('error!', err);
//   });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECT! 🔥 shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
