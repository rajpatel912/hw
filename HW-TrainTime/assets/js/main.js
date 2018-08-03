$(document).ready(function(){

 


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBs3b8H_9n_h5_lj7-c2fWMJ9Q_EYyyde4",
        authDomain: "traintimes-48a71.firebaseapp.com",
        databaseURL: "https://traintimes-48a71.firebaseio.com",
        projectId: "traintimes-48a71",
        storageBucket: "traintimes-48a71.appspot.com",
        messagingSenderId: "303108855089"
      };
      firebase.initializeApp(config);
   
     var database = firebase.database();
   
   //creating some global variables for just in case.
   let trainName = "";
   let destination = "";
   let trainTime = "";
   let frequency = "";
   
   // 2. Button for adding Employees
   $("#add-Train-btn").on("click", function(event) {
       event.preventDefault();
   
     
   
       // Grabs user input
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = moment($("#trainTime-input").val().trim(),"hh:mm").format("X");
        frequency = $("#freq-input").val().trim();
   
        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);
        var chooChoo = {
           trainName: trainName,
           destination: destination,
           trainTime: trainTime,
           frequency: frequency
          };
   
        database.ref().push(chooChoo);
   });
   
   

    database.ref().on('child_added', function(childSnapshot, prevChildKey){
       console.log(childSnapshot.val());
       console.log(childSnapshot.val().destination);
       console.log(childSnapshot.val().trainName);
       console.log(childSnapshot.val().trainTime);
       console.log(childSnapshot.val().frequency);
   
       let tName=childSnapshot.val().trainName;
       let tTime=childSnapshot.val().trainTime;
       let tDestination=childSnapshot.val().destination;
       let tFrequency=childSnapshot.val().frequency;
      
       
   
   //the tDifference equals some amount of minutes.
     let tDifference=moment().subtract(moment.unix(tTime),'minutes');
   //now we want to see how many minutes are left over from some amount of frequency
     let tRemainder=tDifference%tFrequency;
   
     let tMinutes=tFrequency-tRemainder;
     let tArrival=moment().add(tMinutes, 'm').format("hh:mm");
     
   
       $("#arrivals").append("<tr><td>"+tName+"</td><td>"+tDestination+"</td><td>"+tFrequency+"</td><td>"+tArrival+"</td><td>"+tMinutes+"</td></tr>")
    })
   
  
   
   
    });