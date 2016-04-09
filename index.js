var prompt = require('prompt');
var leverR = 'up';
var leverL = 'up';

console.log('There are two levers, one on the right, and the other on the left.');

prompt.start();

printLevers();
getInput();

function getInput() {prompt.get(['command'], function (err, result){
	if(err) {return onErr(err);}
	if(result.command === 'flip left lever')
	{flipLeverL();}
	if(result.command === 'flip right lever')
	{flipLeverR();}
	printLevers();
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
