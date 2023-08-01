require('dotenv').config()
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
// const bodyParser = require('body-parser');
// const dbConnect = require("./config/mongodb")


// Database Connection
require("./config/mongodb")
// dbConnect();


app.set("view engine", "ejs"); //Tells our app to use ejs as its view engine
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Express can now parse directly by itself
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //We need to explicitly tell express to look for static files(CSS) in this folder
app.use('/', userRoutes);
app.use('/', noteRoutes);


app.get("/", function (req, res) {
    res.render("home")
    // response.sendFile(__dirname + "/home.html");
});


const port = process.env.PORT
app.listen(port, function () {
    console.log(`Server started on port ${port}.`);
});