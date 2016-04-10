var game = require('./game');
var index = require('./index');

var leverR;
var leverL;

//turns commands into functons
function doCommand(command, args)
{
	if (command === 'flip')
		flipLever(args);
	else
		console.log('I don\'t know what you mean');
}

//flip levers and save the state of the room
function flipLever(str)
{
	if(str === 'left lever')
	{
		leverL= leverL ? false : true;
		leverR=false;
	}
	if(str === 'right lever')
	{
		leverR= leverR ? false : true;
		leverL=false;
	}
	else
		console.log('unknown lever');
	
	game.getRoom((room) => {
        room.state['left lever'] = leverL;
        room.state['right lever'] = leverR;

        game.saveRoom(room, (err) => {if(err) throw err;});
    });
}

//prints the state of the levers, true is up, false is down
function printStatus()
{
	var str1 = leverL ? 'up' : 'down';
	var str2 = leverR ? 'up' : 'down';
	console.log('Left Lever: ' + str1 + ' Right Lever: '  + str2);
}

//make a new lever room
function makeRoom()
{
	//attempt to read from a file
	game.getRoom((room) => {
	leverR = room.state['right lever'];
	leverL = room.state['left lever'];
	
	console.log(room.description);
	
	index.getInput();
});
}

exports.makeRoom = makeRoom;
exports.printStatus = printStatus;
exports.doCommand = doCommand;
