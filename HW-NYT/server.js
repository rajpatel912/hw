// Include Server Dependencies
var express = require("express");
const path = require('path');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./src/models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 4000;

app.use(logger("dev"));
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});



app.get("/api", function(req, res) {

  Article.find({}).sort([["date", "descending"]])
  .exec()
  .then((result)=>{
    res.json(result);
  })
  .catch((error)=>{
    res.json(error);
  })

});

// This is the route we will send POST requests to save newly scraped articles.
app.post("/api", function(req, res) {


// .then((result)=>{
//     console.log(result);
//     res.json(result);
//   })
//   .catch((error)=>{
//     console.log(error);
//   });
 });

// This fetches only the articles that have been saved
app.get("/api/saved", function(req, res) {

  Article.find({
    saved: true
  }).sort([["date", "descending"]])
  .exec()
  .then((result)=>{
    res.json(result);
  })
  .catch((error)=>{
    res.json(error);
  })

});

// This will update the saved status of a single article
app.post("/api/saved", function(req, res) {

  
  Article.findOneAndUpdate({title: ""}, {saved: true}, {new: true})
  .exec()
  .then((result)=>{
    console.log(result);
    res.json(result);
  })
  .catch((error)=>{
    console.log(error);
  });

});

// Main "/" Route. This will redirect the user to our rendered React application
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});