'use strict';
var rl = require('readline').createInterface({
    input: process.stdin, output: process.stdout
});
var path = require('path');

var game = require('./game');

var git = require('./git');

var commands = {
    help: function (room, callback) {
        console.log(
`You asked for help! Yay!

Seriously, though, here are some commands:
    help: prints this prompt
    quit: jump off the train (exits the game)
    describe: get some information on where you are
    history: find out what's been done in this place
    realities: find out what parallel realities exist
    warp: change realities
    merge: merge another reality with the current one
`
        );
        callback();
    },
    quit: function () {
        rl.close();
        process.exit(0);
    },
    describe: function (room, callback) {
        console.log(room.description);
        callback();
    },
    history: function (room, callback) {
        game.currentRoom((err, roomString) => {
            git.log(path.join('saveState', roomString), (code, data) => {
                console.log(`${data}`);
                callback();
            });
        });
    },
    realities: function (room, callback) {
        game.currentRoom((err, roomString) => {
            git.branch(path.join('saveState', roomString), (code, data) => {
                console.log(`${data}`);
                callback();
            });
        });
    },
    warp: function (room, reality, callback) {
        game.currentRoom((err, roomString) => {
            git.checkout(path.join('saveState', roomString), reality, (code) => {
                console.log(`Warped to reality ${reality}.`);
                callback();
            });
        });
    },
    merge: function (room, reality, callback) {
        game.currentRoom((err, roomString) => {
            git.merge(path.join('saveState', roomString), reality, (code, data) => {
                console.log(`Reality ${reality} merged.`);
                callback();
            });
        });
    }
}

var prompts = [
    'Enter command: ',
    'Enter help for more information: '
]

var question;

var main = () => {
    game.getRoom((room) => {
        var roomIndex;

        if (game.passesWinCondition(room)) {
            // TODO: print winning text
            // TODO: update to next room
        }

        if (prompts.length > 0) {
            question = prompts.pop();
        }
        rl.question(question, (result) => {
            var args, name;

            args = result.split(' ');

            name = args[0];
            args = [room].concat(args.slice(1), main);

            if (commands.hasOwnProperty(name)) {
                commands[name].apply(this, args);
            } else {
                console.log(`${result} is an unrecognized command`);
                main();
            }
        });
    });
};

if (require.main === module) {
    main();
}
