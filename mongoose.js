const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;