var players = []

var player1 = {name: "",
							 position: 0,
							 color: "blue",
							 key: 113}

//race mechanics using Q, P, Z and / keys to advance along the track
function keyPressed(event) {
	event = event.keyCode;
	
	// subtract 1 from the length to account for starting at 0th position
	var lastCell = ($(".player-1 li").length - 1); 	

	// if the other players haven't won yet and the Q key is pressed, move Player 1 forward. Keypress only works on race screen. 
	if ( (player2Position < lastCell) && (player3Position < lastCell) && (player4Position < lastCell) && (event === 113) && ($(".race-screen").hasClass("hidden") === false) ) {
		advancePlayer1(1);
	} 
		 
	// if the other players haven't won yet and the P key is pressed, move Player 2 forward. Keypress only works on race screen.
	if ( (player1Position < lastCell) && (player3Position < lastCell) && (player4Position < lastCell) && (event === 112) && ($(".race-screen").hasClass("hidden") === false) ) {
		advancePlayer2();
	}

	// if the other players haven't won yet and the Z key is pressed, move Player 3 forward. Keypress only works on race screen.
	if ( (player1Position < lastCell) && (player2Position < lastCell) && (player4Position < lastCell) && (event === 122) && ($(".race-screen").hasClass("hidden") === false) ) {
		advancePlayer3();
	}

	// if the other players haven't won yet and the ? key is pressed, move Player 4 forward. Keypress only works on race screen.
	if ( (player1Position < lastCell) && (player2Position < lastCell) && (player3Position < lastCell) && (event === 47) && ($(".race-screen").hasClass("hidden") === false) ) {
		advancePlayer4();
	}

	var winner_message = $("h1.winner-message")
	var playerNames = $(".racetrack.names li")

	// if player 1 wins, display winner message and hide instructions.
	if (player1Position >= lastCell) {
		winner_message.html(playerNames[0].innerHTML + " wins!");
		$(".player-1 li").eq(lastCell).addClass("active");
	}

	// if player 2 wins, display winner message and hide instructions.
	if (player2Position >= lastCell) {
		winner_message.html(playerNames[1].innerHTML + " wins!");
		$(".player-2 li").eq(lastCell).addClass("active");
	}

	// if player 3 wins, display winner message and hide instructions.
	if (player3Position >= lastCell) {
		winner_message.html(playerNames[2].innerHTML + " wins!");
		$(".player-3 li").eq(lastCell).addClass("active");
	}

	// if player 4 wins, display winner message and hide instructions.
	if (player4Position >= lastCell) {
		winner_message.html(playerNames[3].innerHTML + " wins!");
		$(".player-4 li").eq(lastCell).addClass("active");
	}

	//if any player is in the last cell, the game is over, so hide the instructions and show the winner message.
	if ( 
		(player1Position >= lastCell) || 
		(player2Position >= lastCell) || 
		(player3Position >= lastCell) || 
		(player4Position >= lastCell) ) {
			$(".instructions").addClass("hidden");
			$(".winner-message").removeClass("hidden");
	}
} //end function keyPressed

//Move players forward with each keypress, but only if you're on the racetrack screen
var player1Position = 0;
function advancePlayer1() {
	$(".player-1 li").eq(player1Position).removeClass("active");
	player1Position = player1Position + 1;
	$(".player-1 li").eq(player1Position).addClass("active");
}

var player2Position = 0;
function advancePlayer2() {
	$(".player-2 li").eq(player2Position).removeClass("active");
	player2Position = player2Position + 1;
	$(".player-2 li").eq(player2Position).addClass("active");
}

var player3Position = 0;
function advancePlayer3() {
	$(".player-3 li").eq(player3Position).removeClass("active");
	player3Position = player3Position + 1;
	$(".player-3 li").eq(player3Position).addClass("active");
}

var player4Position = 0;
function advancePlayer4() {
	$(".player-4 li").eq(player4Position).removeClass("active");
	player4Position = player4Position + 1;
	$(".player-4 li").eq(player4Position).addClass("active");
}

	// function advancePlayer(playerNumber, position) {
	// 	var row = $(".player-" + playerNumber + " li");
	// 	row.eq(position).removeClass("active");
	// 	players[playerNumber].position = position + 1;
	// 	row.eq(position).addClass("active");
	// }




$(document).ready(function() {
	$("body").keypress(keyPressed);

	//Select number of players, 1-4
	function selectNumberOfPlayers(number) {
		$(".choose-players").addClass("hidden");
		$(".player-details-box").removeClass("hidden");
		console.log("you clicked on " + number);

		//unhides info box, instructions, lane and player name next to lane for player 1
		if ((number === 1) || (number === 2) || (number === 3) || (number === 4)) {
			$(".player-details.first-player").removeClass("hidden");
			$(".instructions div p").eq(1).removeClass("hidden");	
			$(".lane.player-1").removeClass("hidden");
			$(".names li").eq(0).removeClass("hidden");
		}

		//unhides info box, instructions, lane and player name next to lane for player 2
		if ((number === 2) || (number === 3) || (number === 4)) {
			$(".player-details.second-player").removeClass("hidden");
			$(".instructions div p").eq(2).removeClass("hidden");	
			$(".lane.player-2").removeClass("hidden");
			$(".names li").eq(1).removeClass("hidden");
		}

		//unhides info box, instructions, lane and player name next to lane for players 3
		if ((number === 3) || (number === 4)) {
			$(".player-details.third-player").removeClass("hidden");
			$(".instructions div p").eq(3).removeClass("hidden");	
			$(".lane.player-3").removeClass("hidden");
			$(".names li").eq(2).removeClass("hidden");
		}

		//unhides info box, instructions, lane and player name next to lane for players 4
		if (number === 4) {
			$(".player-details.fourth-player").removeClass("hidden");
			$(".instructions div p").eq(4).removeClass("hidden");	
			$(".lane.player-4").removeClass("hidden");
			$(".names li").eq(3).removeClass("hidden");
		}
	}
	 
	// Runs selectNumberOfPlayers function when 1,2,3, or 4 is clicked 
	$(".number-players li").eq(0).click(function() {
		selectNumberOfPlayers(1)
	});

	$(".number-players li").eq(1).click(function() {
		selectNumberOfPlayers(2)
	});

	$(".number-players li").eq(2).click(function() {
		selectNumberOfPlayers(3)
	});

	$(".number-players li").eq(3).click(function() {
		selectNumberOfPlayers(4)
	});

	//back button functionality on Player Input screen- go back to change # of players
	function goBack() {
		$(".choose-players").removeClass("hidden");
		$(".player-details-box").addClass("hidden");
	}
	$("button.back").click(function() {
		goBack();
	});

	//Let's Play button functionality on Player Input screen- go forward to race screen. 
	//Also adds player names to their racetracks, and to the instructions. 
	function startGameScreen() {
		$(".player-details-box").addClass("hidden");
		$(".welcome").addClass("hidden");
		$(".race-screen").removeClass("hidden");

		var player1Name = $(".player-details.first-player .name").val();
		var player2Name = $(".player-details.second-player .name").val();
		var player3Name = $(".player-details.third-player .name").val();
		var player4Name = $(".player-details.fourth-player .name").val();

		// shows default "Player X" if no name is entered on previous screen
		if ($(".player-details.first-player .name").val() === "") {
			var player1Name = "Player 1";
		}
		if ($(".player-details.second-player .name").val() === "") {
			var player2Name = "Player 2";
		}
		if ($(".player-details.third-player .name").val() === "") {
			var player3Name = "Player 3";
		}
		if ($(".player-details.fourth-player .name").val() === "") {
			var player4Name = "Player 4";
		}

		// adds player names next to their racetracks
		$(".racetrack.names li").eq(0).html(player1Name);
		$(".racetrack.names li").eq(1).html(player2Name);
		$(".racetrack.names li").eq(2).html(player3Name);
		$(".racetrack.names li").eq(3).html(player4Name);

		// adds player names next to their instructions
		$(".instructions p").eq(1).html(player1Name +" - Press Q");
		$(".instructions p").eq(2).html(player2Name +" - Press P")
		$(".instructions p").eq(3).html(player3Name +" - Press Z")
		$(".instructions p").eq(4).html(player4Name +" - Press ?")
	}

	//advances to game screen when "Let's Race" button is clicked
	$("button.lets-race").click(function() {
		startGameScreen();
	});

	// Play Again button functionality on winner screen- return to Welcome screen.
	// Resets all names and player positions. 
	function playAgain () {
		var lastCell = ($(".player-1 li").length - 1); 	

		$(".race-screen").addClass("hidden");
		$(".winner-message").addClass("hidden");
		$(".instructions").removeClass("hidden");
		$(".welcome").removeClass("hidden");
		$(".choose-players").removeClass("hidden");
		$(".player-details.first-player .name").val("");
		$(".player-details.second-player .name").val("");
		$(".player-details.third-player .name").val("");
		$(".player-details.fourth-player .name").val("");
		$(".racetrack.names li").eq(0).html("");
		$(".racetrack.names li").eq(1).html("");
		$(".racetrack.names li").eq(2).html("");
		$(".racetrack.names li").eq(3).html("");
		$(".instructions p").eq(1).html(" - Press Q");
		$(".instructions p").eq(2).html(" - Press P");
		$(".instructions p").eq(3).html(" - Press Z");
		$(".instructions p").eq(4).html(" - Press /");
		$(".player-1 li").eq(player1Position).removeClass("active")
		$(".player-1 li").eq(lastCell).removeClass("active");
		player1Position = $(".player-1 li").eq(0);
		player1Position.addClass("active");
		$(".player-2 li").eq(player2Position).removeClass("active")
		$(".player-2 li").eq(lastCell).removeClass("active");
		player2Position = $(".player-2 li").eq(0);
		player2Position.addClass("active");
		$(".player-3 li").eq(player3Position).removeClass("active")
		$(".player-3 li").eq(lastCell).removeClass("active");
		player3Position = $(".player-3 li").eq(0);
		player3Position.addClass("active");
		$(".player-4 li").eq(player4Position).removeClass("active")
		$(".player-4 li").eq(lastCell).removeClass("active");
		player4Position = $(".player-4 li").eq(0);
		player4Position.addClass("active");	
	}


	//returns to Welcome screen when "Play Again" button is clicked
	$("button.play-again").click(function() {
		playAgain();
	});


	// //Collect color selected for each player, and gray out for other players
	// function assignPlayerColor(player, color) { //ie (player-1, red)
	// 	//on click, <- need to add this functionality
	// 	$(player+" .colors "+color);.addClass("selected");
	// 	$(player+".colors "+color).removeClass("red yellow green blue colors");
	// 	$(".colors "+color).addClass("gray");
 

	// }




});

