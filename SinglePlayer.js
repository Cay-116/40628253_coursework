//Keeps track of player and dealers total sums 
var dealer_sum = 0;
var player_sum = 0;

//Keeps track of number of aces to help deal with decision of 1 or 11
var dealer_ace_count = 0;
var player_ace_count = 0;

//Represents the dealers hidden card
var hidden;
//Is an array that holds all of the cards
var deck;

//If true, the player can draw more, if changed to false, the player cannot draw more
var can_hit = true; 

//Variables for the betting 
var bet_amount = 0;

//Tries to get information from local storage, if none available sets to 1000
try 
{
	bank = parseInt(localStorage.getItem('balance'));
	
	
} 
catch 
{
	var bank = 1000;
}





//Executes some functions upon loading the webpage
window.onload = function () 
{
	//Calls the build deck function
	build_deck();
	//Calls the shuffle deck function
	shuffle_deck();
	//Calls the starts() function 
	start();
	
	//Calls the hit() function when the "hit" button is clicked
	document.getElementById("hit").addEventListener("click", hit);
	//Calls the stand() function when the "stand" button is clicked
    document.getElementById("stand").addEventListener("click", stand);
	
	//For the "New G
	//Calls the new_round() function when the "new round" button is clicked
	document.getElementById("new-round").addEventListener("click", new_round);
	//Calls the new-game() function when the "New Game" button is clicked
	document.getElementById("new-game").addEventListener("click", new_game);
	
	
	
    //Calls the place_bet function
    document.getElementById("bet-10").addEventListener("click",function(){place_bet(10);});
    document.getElementById("bet-20").addEventListener("click",function(){place_bet(20);});
    document.getElementById("bet-30").addEventListener("click",function(){place_bet(30);});
    document.getElementById("bet-40").addEventListener("click",function(){place_bet(40);});
    document.getElementById("bet-50").addEventListener("click",function(){place_bet(50);});
	
	//Updates text with appropriate bank balance
	document.getElementById("bank-balance").innerText = bank;
}



//Builds the deck in an organised way
function build_deck()
{
	//Defines an array with each possible value for cards
	let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    //Defines an array with the first letter of each suit
	let suits = ["C", "S", "H", "D"];
	deck = [];
	
	//Will go through each of the suits, and then each value, adding the value and suit onto one name to correspond to image files
	for (let i = 0; i < suits.length; i++)
	{
		for (let x = 0; x < values.length; x++)
		{
			deck.push(values[x] + "-" + suits[i]);
		}
	}	
}



//Responsible for randomising the order of the deck array
function shuffle_deck() 
{
	//Loops through each card in the deck, swapping cards around
    for (let i = 0; i < deck.length; i++) 
	{
        let x = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[x];
        deck[x] = temp;
    }
}



//Sets variables, gives the dealer cards, and gives the player their initial cards
function start() 
{
	//sets the "dealers" hidden card to the card removed (popped) from the deck
    hidden = deck.pop();
	
	//Adds the value of the hiedden card to the dealers total, and adds to the ace count if its an ace 
    dealer_sum += get_value(hidden);
    dealer_ace_count += check_ace(hidden);

    console.log(hidden);
    //console.log(dealer_sum);

	//Draws card(s) for the dealer while the value is less than 18
    while (dealer_sum < 18) {
        let card_img = document.createElement("img");
        let card = deck.pop();
        card_img.src = "./cards/" + card + ".png";
        dealer_sum += get_value(card);
        dealer_ace_count += check_ace(card);
        document.getElementById("dealer-cards").append(card_img);
    }
    //console.log(dealer_sum);
	
	//Draw 2 initial cards for the player
    for (let i = 0; i < 2; i++) {
        let card_img = document.createElement("img");
        let card = deck.pop();
        card_img.src = "./cards/" + card + ".png";
        player_sum += get_value(card);
        player_ace_count += check_ace(card);
        document.getElementById("players-cards").append(card_img);
    }
    //console.log(player_sum);
}



//Allows the player to draw more cards
function hit() 
{
	//If the player isn't permitted to draw, the function is ended early
    if (can_hit == false) 
	{
        return;
    }
    let card_img = document.createElement("img");
    let card = deck.pop();
    card_img.src = "./cards/" + card + ".png";
    player_sum += get_value(card);
    player_ace_count += check_ace(card);
    document.getElementById("players-cards").append(card_img);
	
	//Checks if the players total is over 21, after the reduction of all aces values.
    if (reduce_ace(player_sum, player_ace_count) > 21) 
	{
        can_hit = false;
        end_round();
    }
}



//Allows the player to end the round by drawing no more cards
function stand() 
{
	//Reduces any aces not already dealt with to give scores. 
    dealer_sum = reduce_ace(dealer_sum, dealer_ace_count);
    player_sum = reduce_ace(player_sum, player_ace_count);

	//prevents the player from drawing further
    can_hit = false;
	//Changes the hidden card to face up
    //document.getElementById("hidden-card").src = "./cards/" + hidden + ".png";
    end_round();
}

//Splits the cards by the dash in the file name
function get_value(card) 
{
	//splits the cards file name into an array of strings, making index 0 the value and index 1 the suit
	let data = card.split("-");
	let value = data[0]; 
	
	//Checks if the value is not a number
	if (isNaN(value))
	{
		//Checks for letter A, if it is, return 11, if not return 10
		if (value == "A") 
		{
			return 11;
		}
		return 10;
	}
	
	//If the value is a number, it returns the number as an integer 
	return parseInt(value);
}



//Checks if the card is an ace 
function check_ace(card) 
{
	if (card[0] == "A")
	{
		return 1;
	}
	return 0;
}

//Responsible for reducing the value of an ace from 11 to 1 
function reduce_ace(player_sum, player_ace_count) 
{
	//Executes a loop while the players value is over 21, and has an ace
	while (player_sum > 21 && player_ace_count > 0) 
	{
		//Reduces appropriate amount from players card total 
		player_sum -= 10;
		//Reduces the ace count after an ace is processed
		player_ace_count -= 1;
	}
	return player_sum;
}

//Puts the bank balance into local storage, and then relaods the page 
function new_round()
{
	localStorage.setItem("balance", bank.toString())
	
	location.reload()
}

//Resets the bank balance in a scenario where the player runs out of money
function new_game()
{
	bank = 1000;
}

//Deals with the ending of the round, and win/loss conditions
function end_round() 
{
	//Changes the hidden card to face up
    document.getElementById("hidden-card").src = "./cards/" + hidden + ".png";
	//Defines an empty string, that will be updated depending on the outcome
    let message = "";

    //Draw conditions
	if (player_sum == dealer_sum)
	{
		message = "Draw";
		bank += bet_amount;
		bank -= bet_amount;
	}
	if (player_sum > 21 && dealer_sum > 21)
	{
		message = "Draw";
		bank += bet_amount;
		bank -= bet_amount;
	}
	
	//Dealer victory conditions 
	if (player_sum > 21 && dealer_sum < 21)
	{
		message = "Dealer wins";
		bank -= bet_amount;
	}
	if (player_sum < dealer_sum && dealer_sum <= 21) 
	{
		message = "Dealer wins";
		bank -= bet_amount;
	}
	
	//Player victory conditions
	if (player_sum <= 21 && dealer_sum > 21)
	{
		message = "Player wins";
		bank += bet_amount;
	}
	if (player_sum > dealer_sum && player_sum <=21)
	{
		message = "Player wins";
		bank += bet_amount;
	}


	document.getElementById("dealer-total").innerText = dealer_sum;
	document.getElementById("player-total").innerText = player_sum;
    //Displays message with result and updated bank balance 
    document.getElementById("results").innerText = message;
    document.getElementById("bank-balance").innerText = bank;
    reset_bet();
}

//Deals with the betting values
function place_bet(amount) 
{
    //Checks if the bet amount is going over the current bank balance
    if (amount > bank) 
	{
        alert("You don't have enough funds!");
        return;
    }
    //Checks if the total bet amount exceeds the bank balance
    if (bet_amount + amount > bank) 
	{
        alert("Your bet exceeds your bank balance!");
        return;
    }


    bet_amount += amount;
	
	//updates text with the bet amount 
    document.getElementById("bet-amount").innerText = bet_amount;
}



function reset_bet() 
{
    betAmount = 0;
	//Updates the bet amount text with the current amount being bet 
    document.getElementById("bet-amount").innerText = bet_amount;
}
