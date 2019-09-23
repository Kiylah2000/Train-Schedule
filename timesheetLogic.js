
// 1. Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyADuJAwrea_JexEx2bS9hS8tknNiHwdmyU",
    authDomain: "train-schedule-6ad41.firebaseapp.com",
    databaseURL: "https://train-schedule-6ad41.firebaseio.com",
    projectId: "train-schedule-6ad41",
    storageBucket: "",
    messagingSenderId: "1006413929711",
    appId: "1:1006413929711:web:4388e40f01c8adbaa98f1a"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var nextArrival = $("#next-arrival-input").val().trim();
    

    // Creates local "temporary" object for holding employee data
    var schedule = {
      name: trainName,
      place: destination,
      start: frequency,
      arrival: nextArrival,
     
    };
  
    // Uploads employee data to the database
    database.ref().push(schedule);
  
    // Logs everything to console
    console.log(schedule.name);
    console.log(schedule.place);
    console.log(schedule.start);
    console.log(schedule.arrival);
   
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#next-arrival-input").val("");
    
});

  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var frequency = childSnapshot.val().start;
    var nextArrival = childSnapshot.val().arrival;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);
  
    // // Prettify the start time
    // var frequencyPretty = moment.unix(frequency).format("hh:mm");
  
    // // Calculate the minutes away worked using hardcore math
    // // To calculate the minutes away worked
    // var minutesAway = moment().diff(moment(frequency, "X"), "months");
    // console.log(minutesAway);
  

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequencyPretty),
      $("<td>").text(minutesAway),
      $("<td>").text(nextArrival),
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  