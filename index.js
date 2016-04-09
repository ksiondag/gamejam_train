//sets up the command line reader and filesystem
var rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

var game = require('./game');

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
	{flipLever('left');}
	if(result === 'flip right lever')
	{flipLever('right');}
	
	
	//prints the levers
	printLevers();
	//recursion to make an infinite loop
	getInput();
	});
}

//flip levers and save the state of the room
function flipLever(str)
{
	if(str === 'left')
	{
		leverL= leverL ? false : true;
		leverR=false;
	}
	if(str === 'right')
	{
		leverR= leverR ? false : true;
		leverL=false;
	}
	
	game.getRoom((room) => {
        room.state['left lever'] = leverL;
        room.state['right lever'] = leverR;

        game.saveRoom(room, (err) => {if(err) throw err;});
        });
}

//prints the state of the levers, true is up, false is down
function printLevers()
{
	var str1 = leverL ? 'up' : 'down';
	var str2 = leverR ? 'up' : 'down';
	console.log('Left Lever: ' + str1 + ' Right Lever: '  + str2);
}
