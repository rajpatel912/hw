let friendsData = require("../data/friends");

    
   //routing

   module.exports = (function(app){
       app.get("/api/friends", function(req, res){
           res.json(friendsData);
       })
       app.post("/api/friends", function(req, res){
           let userInput = req.body;

           //console.log(userInput);

           let userScores = userInput.scores;
           console.log("got here " + userScores);
           console.log("test 1 " +parseInt(userScores));
           let matchName;
           let matchImg;
           let totalDif = 10000;


           for (let i = 0; i <friendsData.length; i++){
               
               let difference = 0;
               for (let j = 0; j < userScores.length; j++){
                  
                  // console.log('userScores: ' + userScores[j]);
                   console.log('friendsData[i].scores[j]: ' + (friendsData[i].scores[j]));
                   
                    difference = difference + Math.abs(friendsData[i].scores[j] - userScores[j])

                   if (difference < totalDif) {
                       totalDif = difference;
                       matchName = friendsData[i].name;
                       matchImg = friendsData[i].photo;
                   } 
               }
               
           }

           friendsData.push(userInput);
           res.json({status: 'OK', matchName: matchName, matchImg: matchImg})
           
       });

   });