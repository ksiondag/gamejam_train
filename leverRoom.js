var game = require('./game');
var index = require('./index');

var leverR;
var leverL;

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

//make a new lever room
function makeLever()
{
	//attempt to read from a file
	game.getRoom((room) => {
	leverR = room.state['right lever'];
	leverL = room.state['left lever'];
	
	console.log(room.description);
	
	index.getInput();
});
}

exports.makeLever = makeLever;
exports.printLevers = printLevers;
exports.flipLever = flipLever;
