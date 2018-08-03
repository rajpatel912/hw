$(document).ready(function(){
    let gameGoal = Math.floor(Math.random() * 101 + 19);
    $('#randomNumber').text(gameGoal);
    let crystal2 = Math.floor(Math.random() * 11 + 1);
    let crystal3 = Math.floor(Math.random() * 11 + 1);
    let crystal1 = Math.floor(Math.random() * 11 + 1);
    let crystal4 = Math.floor(Math.random() * 11 + 1);
 
    let totalNum = 0; 
    let wins = 0;
    let losses = 0;



  $('#numberWins').text(wins);
  $('#numberLosses').text(losses);


  function reset(){
        gameGoal = Math.floor(Math.random() * 101 + 19);
        console.log(gameGoal);
        $('#randomNumber').text(gameGoal);
        crystal1 = Math.floor(Math.random() * 11 + 1);
        crystal2 = Math.floor(Math.random() * 11 + 1);
        crystal3 = Math.floor(Math.random() * 11 + 1);
        crystal4 = Math.floor(Math.random() * 11 + 1);
        totalNum = 0;
        $('#finalTotal').text(totalNum);
        } 

 

  function winner(){
  alert("You are a winner!");
    wins++; 
    $('#numberWins').text(wins);
    reset();
  }


  function loser(){
  alert ("You are a loser!");
    losses++;
    $('#numberLosses').text(losses);
    reset()
  }


    $('#one').on ('click', function(){
      totalNum = totalNum + crystal1;
      console.log("New totalNum= " + totalNum);
      $('#finalTotal').text(totalNum); 
            //sets win/lose conditions
          if (totalNum == gameGoal){
            winner();
          }
          else if ( totalNum > gameGoal){
            loser();
          }   
    })  
    $('#two').on ('click', function(){
      totalNum = totalNum + crystal2;
      console.log("New totalNum= " + totalNum);
      $('#finalTotal').text(totalNum); 
          if (totalNum == gameGoal){
            winner();
          }
          else if ( totalNum > gameGoal){
            loser();
          } 
    })  
    $('#three').on ('click', function(){
      totalNum = totalNum + crystal3;
      console.log("New totalNum= " + totalNum);
      $('#finalTotal').text(totalNum);

            if (totalNum == gameGoal){
            winner();
          }
          else if ( totalNum > gameGoal){
            loser();
          } 
    })  
    $('#four').on ('click', function(){
      totalNum = totalNum + crystal4;
      console.log("New totalNum= " + totalNum);
      $('#finalTotal').text(totalNum); 
        
            if (totalNum == gameGoal){
            winner();
          }
          else if ( totalNum > gameGoal){
            loser();
          }
    });   
  }); 