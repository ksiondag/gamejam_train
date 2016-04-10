//sets up the command line reader and filesystem
var rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

var game = require('./game');
//var currentRoom = require('./leverRoom');
var currentRoom = require('./bridge');

currentRoom.makeRoom();

//main loop
function getInput()
{
	//prints the levers
	currentRoom.printStatus();
	
	//get input from user
	rl.question('command: ', (result) => {

	//quits the game
	if(result === 'quit')
	{
		rl.close();
		return;
	}
	
	var index = result.indexOf(' ');
	var args;
	var command;
	if (index === -1)
	{
		args = '';
		command = result;
	}
	else
	{
		args = result.slice(index+1);
		command = result.slice(0, index);
	}
	currentRoom.doCommand(command, args);
	
	
	//recursion to make an infinite loop
	getInput();
	});
}

function setRoom(str)
{
	currentRoom = require(str);
	currentRoom.printStatus();
	currentRoom.makeRoom();
}

exports.setRoom = setRoom;
exports.getInput = getInput;
