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
`    You asked for help! Yay!

    Seriously, though, here are some commands:
        help: prints this prompt
        describe: get some information on where you are
                  and find out what's been done so far
        realities: find out what parallel realities exist for this train car
        warp: change realities
        merge: merge another reality with the current one
        reset: reset all realities of this train car
        quit: jump off the train (exits the game)
`
        );
        callback();
    },
    quit: function () {
        rl.close();
        process.exit(0);
    },
    reset: function (room, callback) {
        game.resetCurrentRoom(() => {
            console.log(
`    All realities of current train car have been reset to original state.`
            );
            callback();
        });
    },
    describe: function (room, callback) {
        game.currentRoom((err, roomString) => {
            git.log(path.join('saveState', roomString), (err, data) => {
                var editedData;

                editedData = data;
                editedData = editedData.replace(/\nAuthor.*\n/g, '\n');
                editedData = editedData.replace(/^commit/g, '    moment');
                editedData = editedData.replace(/\nDate.*\n/g, '\n');
                console.log(`${editedData}`);
                callback();
            });
        });
    },
    realities: function (room, callback) {
        game.currentRoom((err, roomString) => {
            git.branch(path.join('saveState', roomString), (err, data) => {
                console.log(`${data}`);
                callback();
            });
        });
    },
    warp: function (room, reality, callback) {
        if (reality && !callback) {
            console.log('Need a reality name to warp to. See them with "realities" command');
            return reality();
        }
        game.currentRoom((err, roomString) => {
            git.checkout(path.join('saveState', roomString), reality, (err) => {
                if (err) {
                    console.log(`    No reality "${reality}" to warp to.`);
                } else {
                    console.log(`    Warped to reality "${reality}".`);
                }
                callback();
            });
        });
    },
    merge: function (room, reality, callback) {
        if (reality && !callback) {
            console.log('Need a reality name to merge with. See them with "realities" command');
            return reality();
        }
        game.currentRoom((err, roomString) => {
            git.merge(path.join('saveState', roomString), reality, (err, data) => {
                if (err) {
                    console.log(`    No reality "${reality}" to merge with.`);
                } else {
                    console.log(`    Merging into reality "${reality}".`);
                }
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

        if (!room) {
        }

        if (game.passesWinCondition(room, main)) {
            return;
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
