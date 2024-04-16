var hidden 
var hidden_card_value = 0;

var deck;

var card_value = 0;

var win_streak = 0;

var can_guess = true;

//Executes some functions upon loading the webpage
window.onload = function () 
{
	//Calls the build deck function
	build_deck();
	//Calls the shuffle deck function
	shuffle_deck();
	//Calls the starts() function 
	start();
	
	//Calls the higher() function when the "higher button is clicked
	document.getElementById("higher").addEventListener("click", higher);
	//Calls the lower() function when the "lower" button is clicked
    document.getElementById("lower").addEventListener("click", lower);
	//Calls the next() function when the "next" button is clicked
	document.getElementById("next").addEventListener("click", next);

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
	console.log(deck);
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
	console.log(deck)
}

function start()
{
	hidden = deck.pop()
	
	hidden_card_value += get_value(hidden);
	console.log(hidden_card_value);
	
	let card_img = document.createElement("img");
    let card = deck.pop();
    card_img.src = "./cards/" + card + ".png";
    card_value += get_value(card);
    document.getElementById("game-cards").append(card_img);
	console.log(card_value);
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
			return 1;
		}
	}
	if (isNaN(value))
	{
		//Checks for letter A, if it is, return 11, if not return 10
		if (value == "J") 
		{
			return 11;
		}
	}
	if (isNaN(value))
	{
		//Checks for letter A, if it is, return 11, if not return 10
		if (value == "Q") 
		{
			return 12;
		}
	}
	if (isNaN(value))
	{
		//Checks for letter A, if it is, return 11, if not return 10
		if (value == "K") 
		{
			return 13;
		}
	}
	
	
	//If the value is a number, it returns the number as an integer 
	return parseInt(value);
}


//Calls the function for when the higher button is pressed 
function higher()
{
	let message = "";
	
	if(can_guess == false)
	{
		return;
	}
	if(hidden_card_value > card_value)
	{
		win_streak += 1;
		message = "Current Streak: " + win_streak;
		can_guess = false;
	}
	if (hidden_card_value < card_value)
	{
		message = "Current Streak: 0";
		win_streak = 0;
		can_guess = false;
	}
    document.getElementById("results").innerText = message ;
}

//calls the function for when the lower button is pressed 
function lower()
{
	let message = "";
	
	if (can_guess == false)
	{
		return
	}
	if(hidden_card_value < card_value)
	{
		win_streak += 1;
		message = "Current Streak: " + win_streak;
		can_guess = false;
	}
	if (hidden_card_value > card_value)
	{
		message = "Current Streak: 0";
		win_streak = 0;
		can_guess = false;
	}
    document.getElementById("results").innerText = message ;
}
	
//Draws a new card
function next()
{
	
	hidden_card_value = 0;
	
	card_value = 0;
	
	can_guess = true;
	start();
}
	
	
	
	
	
	
