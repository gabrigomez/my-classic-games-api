const express = require('express');
const cors = require('cors');
const login = require('./api/controllers/login');
const register = require('./api/controllers/register');
const editUser = require('./api/controllers/editUser');

const mongoose = require('mongoose');
const addGame = require('./api/controllers/addGame');
const getGame = require('./api/controllers/getGame');
const showGameDetails = require('./api/controllers/showGameDetails');
const deleteGame = require('./api/controllers/deleteGame');
const editGame = require('./api/controllers/editGame');
require('dotenv').config({ path: "api/.env" });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Welcome to the my-game-list api"});
});

//Register User
app.post('/auth/register', register);

//Login User
app.post('/auth/login', login);

// Change username - TODO: back the middleware to check user
app.put("/user/:_id", editUser);

app.put("/game/details/:_id", editGame);

app.post("/game/:_id", addGame);

app.get("/game/:_id", getGame);

app.get("/game/details/:_id", showGameDetails);

app.delete("/game/:_id", deleteGame);

//Credencials
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT || 3001;

const dbLink = `mongodb+srv://${dbUser}:${dbPass}@cluster0.1q4iqd6.mongodb.net/?retryWrites=true&w=majority`
mongoose.set("strictQuery", false);

mongoose.connect(dbLink).then(() => {
  app.listen(port)
  console.log('Conected to MongoDB')

}).catch((err) => console.log(err));

// export default app;
//module.exports = app;

