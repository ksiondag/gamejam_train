var prompt = require('prompt');
var fs = require('fs');

prompt.start();

var description;

var leverR;
var leverL;

//attempt to read from a file
fs.readFile('./leverRoom.txt', 'utf-8', function(err, data){
	if(err) throw err;
	var str = data.split("\n");
	description = str[0];
	leverR = str[1];
	leverL = str[2];
	console.log(description);
	printLevers();
	//starts the main loop
	getInput();
});

function getInput() {prompt.get(['command'], function (err, result){

	//incase of an error
	if(err) {return onErr(err);}
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

function onErr(err) {
	console.log(err);
	return 1;
}

function flipLeverR(){
	leverR = 'down';
	leverL = 'up';
}

function flipLeverL(){
	leverL = 'down';
	leverR = 'up';
}

function printLevers()
{
	console.log('Left Lever: ' + leverL + ' Right Lever: ' + leverR);
}
