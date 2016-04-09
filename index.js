//import prompt and filesystem
var prompt = require('prompt');
prompt.start();

var fs = require('fs');

var game = require('./game');

var description;
var leverR;
var leverL;

//attempt to read from a file
game.getRoom((data) => {
	//splits the text file into sepperate lines
	var str = data.split("\n");
	description = str[0];
	leverR = str[1];
	leverL = str[2];
	
	console.log(description);
	printLevers();
	//starts the main loop
	getInput();
});

//main loop
function getInput()
{
	//get input from user
	prompt.get(['command'], (err, result) => {

	//incase of an error
	if(err) throw err;
	//quits the game
	if(result.command === 'quit')
	{return;}
	
	//flip one lever, restores the other lever
	if(result.command === 'flip left lever')
	{flipLeverL();}
	if(result.command === 'flip right lever')
	{flipLeverR();}
	
	
	//prints the levers
	printLevers();
	//recursion to make an infinite loop
	getInput();
	});
}

//flip levers
function flipLeverR()
{
	leverR = 'down';
	leverL = 'up';
	
	//save levers' state to leverRoom.txt
	var output = description + '\n' + leverR + '\n' + leverL;
    game.saveRoom(output, (err) => {if(err) throw err;});
}

//flip levers
function flipLeverL()
{
	leverL = 'down';
	leverR = 'up';
	
	//save levers' state to leverRoom.txt
	var output = description + '\n' + leverR + '\n' + leverL;
    game.saveRoom(output, (err) => {if(err) throw err;});
}

function printLevers()
{
	console.log('Left Lever: ' + leverL + ' Right Lever: ' + leverR);
}
