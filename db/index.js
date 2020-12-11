const mongoose = require('mongoose');

const DB_URI =
  'mongodb+srv://alaoabiodun:alao1996@cluster0.jbxby.mongodb.net/shopping-db?retryWrites=true&w=majority';

const db = mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connected successfully'))
  .catch(() => console.log('Error connection'));

module.exports = db;
