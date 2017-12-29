console.log("working");
$(document).ready(function() {
// Firebase
var config = {
    apiKey: "AIzaSyDcvev6giWxeznmkaaYGB7R6de6C_malw0",
    authDomain: "trains-caleb.firebaseapp.com",
    databaseURL: "https://trains-caleb.firebaseio.com",
    projectId: "trains-caleb",
    storageBucket: "",
    messagingSenderId: "338828981323"
    };

    firebase.initializeApp(config);
    let database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
// User input
    let anotherTrain = $("#train-input").val().trim();
    let trainDest = $("#destination-input").val().trim();
    let firstTrain = $("#first-input").val().trim();
    let trainFreq = $("#frequency-input").val().trim(); 
    console.log(firstTrain);

    let newTrain = {
        train: anotherTrain,
        destination: trainDest,
        time: firstTrain,
        frequency: trainFreq
    };

    // delete newTrain.firstTrain;
    // console.log(newTrain);

    database.ref().push(newTrain);
    // console.log(newTrain.train);
    // console.log(newTrain.destination);
    // console.log(newTrain.time);
    // console.log(newTrain.frequency);
    alert("Train added");
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    let anotherTrain = childSnapshot.val().train;
    let trainDest = childSnapshot.val().destination;
    let firstTrain = childSnapshot.val().time;
    let trainFreq = childSnapshot.val().frequency;
    console.log(firstTrain);

    // let trainStartPretty = moment().hours(firstTrain, "minutes");
    

    

    let timeArr = firstTrain.split(":");
    let nextTrainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    console.log(nextTrainTime);

    let difference = moment().diff(nextTrainTime, "minutes");
    console.log(difference);

    let remander = difference % trainFreq;
    console.log(remander);

    let finalTime = trainFreq - remander;
    console.log(finalTime);
    
    let everyTrain =  moment().add(finalTime, "m").format("HH:mm");
    console.log(everyTrain);
    
    $("#train-table").append("<tr><td>" + anotherTrain + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + everyTrain +  "</td><td>" + finalTime);  
    
});



});