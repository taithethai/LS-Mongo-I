const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb-1');

const User = require('./models/user');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// * [GET] `/users` This route will return an array of all users.

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.send(users);
  });
});

// * [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)

app.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
});
// * [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
// * [DELETE] `/users/:id` This route should delete the specified user.

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
