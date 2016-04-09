//sets up the command line reader and filesystem
var readline = require('readline');
var rl = readline.createInterface({input: process.stdin, output: process.stdout});

var fs = require('fs');

var game = require('./game');

var description;
var leverR;
var leverL;

//attempt to read from a file
game.getRoom((room) => {
	leverR = room.state['right lever'];
	leverL = room.state['left lever'];
	
	console.log(room.description);
	printLevers();
	//starts the main loop
	getInput();
});

//main loop
function getInput()
{
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
	{flipLeverL();}
	if(result === 'flip right lever')
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
	leverR = leverR ? false : true;
	leverL = false;
	
	updateRoom();
}

//flip levers
function flipLeverL()
{
	leverR = false;
	leverL = leverL ? false : true;
	
	updateRoom();
}

function updateRoom () {
    game.getRoom((room) => {
        room.state['left lever'] = leverL;
        room.state['right lever'] = leverR;

        game.saveRoom(room, (err) => {if(err) throw err;});
    });
};

function printLevers()
{
	console.log('Left Lever: ' + leverL + ' Right Lever: ' + leverR);
}

