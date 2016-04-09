//sets up the command line reader and filesystem
var rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

var game = require('./game');
var leverRoom = require('./leverRoom');

leverRoom.makeLever();

//main loop
function getInput()
{
	//prints the levers
	leverRoom.printLevers();
	
	//get input from user
	rl.question('command: ', (result) => {

	//quits the game
	if(result === 'quit')
	{
		rl.close();
		return;
	}
	
	//flip one lever, restores the other lever
	if(result === 'flip left lever')
	{leverRoom.flipLever('left');}
	if(result === 'flip right lever')
	{leverRoom.flipLever('right');}
	
	//recursion to make an infinite loop
	getInput();
	});
}

exports.getInput = getInput;
