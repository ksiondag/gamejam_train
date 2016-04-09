var prompt = require('prompt');

prompt.start();

prompt.get(['command'], function (err, result){
	if(err) {return onErr(err);}
	console.log('Command-line-input recieved:');
	console.log(' Command: ' + result.command);
});

function onErr(err) {
	console.log(err);
	return 1;
}
