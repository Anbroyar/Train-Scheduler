$(document).ready(function() {

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBLV0caIR4wNs7fgDTC9apwWkhNwxbkkgk",
    authDomain: "train-2f57a.firebaseapp.com",
    databaseURL: "https://train-2f57a.firebaseio.com",
    projectId: "train-2f57a",
    storageBucket: "",
    messagingSenderId: "892573043971"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";    
	var destination = ""; 
	var firstTrain = "";    
	var frequency = "";    
	

	$('#submit-btn').on("click", function(event) {
		event.preventDefault();

		
		trainName = $("#train-name").val().trim();
		destination = $("#destination").val().trim();
		firstTrain = $("#first-train").val().trim();
		frequency = $("#frequency").val().trim();
		firstchanged = moment(firstTrain, "hh:mm").subtract(1, "month");
		var func = moment().diff(moment(firstchanged), "minutes");
		
		var currentTime = moment();
		var time = firstchanged % frequency;
		var minutesAway = frequency - time;
		var nextTrain = moment().add(minutesAway, "minutes");
		var convertnexttrain = moment(nextTrain).format("hh:mm");
  
		var newTrain = {     
			name: trainName,     
			destination: destination,     
			frequency: frequency,     
			arrival: convertnexttrain,
			min: minutesAway   
		};
		console.log(newTrain);
  
		database.ref().push(newTrain);
  
		$("#train-name").val("");   
		$("#destination").val("");   
		$("#first-train").val("");   
		$("#frequency").val("");

	});

	database.ref().on("child_added", function(childSnapshot) {   
	console.log(childSnapshot.val());     
	trainName = childSnapshot.val().name;   
	destination = childSnapshot.val().destination;   
	frequency = childSnapshot.val().frequency;   
	convertnexttrain = childSnapshot.val().arrival;
	minutesAway = childSnapshot.val().min;   
   
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + convertnexttrain + "</td><td>" + minutesAway + "</td></tr>"); 
});

});