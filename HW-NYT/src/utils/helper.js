// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location) {

    console.log(location);

  },

  // This function hits our own server to retrieve the record of query results
  getArticles: function() {
    return axios.get("/api");
  },

  // This function posts saves an article to our database.
  postArticle: function(location) {
    return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;