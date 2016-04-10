var index = require('./index');
var game = require('./game');

var vase;
var fire;
var bridge;

var description = 'there is a wall of fire and a vase full of water infront of you. behind the fire is a fallen bridge and a button.  beyond the bridge is a door.'; 

function doCommand(command, args)
{
	if (command === 'pour')
		pour();
	else if (command === 'place')
		place();
	else if (command === 'move')
		move();
	else
		console.log('I don\'t know what you mean');
}

function printStatus()
{
	if(vase)
		console.log('the vase is full of water');
	else
		console.log('the vase is empty');
	if(fire)
		console.log('the wall of fire block your path');
	else
		console.log('the fire is no more');
	if(bridge)
		console.log('the bridge is crosable');
	else
		console.log('the bridge is down');
}

function pour()
{
	if (vase)
	{
		fire = false;
		vase = false;
		console.log('you pour the water on the fire');
	}
	else
	{
		console.log('the fase is empty');
	}
}

function place()
{
	if (vase)
	{
		bridge = true;
	}
	else
	{
		console.log('vase is to light');
	}
}

function move()
{
	if(fire)
	{
		console.log('you can\'t move past the fire');
		return;
	}	
	if(bridge ===false)
	{
		console.log('the fallen bridge blocks your path');
		return;
	}
	console.log('you go to the next room');
	index.setRoom('./leverRoom');
}

function makeRoom()
{
	game.getRoom((room) => {
	vase = true;
	fire = true;
	bridge = false;
	console.log(description);
	index.getInput();
	});
}

exports.makeRoom = makeRoom;
exports.doCommand = doCommand;
exports.printStatus = printStatus;
