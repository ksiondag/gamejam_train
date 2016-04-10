/**
Game logic and state.
*/

// Node libraries in use
var fs = require('fs');

var extraFs = require('./extra-fs');

var CURRENT_ROOM = 'saveState/currentRoom';

var initSaveState = (callback) => {
    extraFs.copyDir('assets', 'saveState', () => {
        fs.symlink('leverRoom', CURRENT_ROOM, (err) => {
            if (err) {
                throw err;
            }
            getRoom(callback);
        });
    });
};

var getRoom = (callback) => {
    fs.readFile(CURRENT_ROOM + '/info.json', 'utf-8', (err, data) => {
        if (err) {
            // Save state does not exist yet
            initSaveState(callback);
        } else {
            callback(
                JSON.parse(data)
            );
        }
    });
};

var saveRoom = (room, callback) => {
	fs.writeFile(CURRENT_ROOM + '/info.json', JSON.stringify(room, null, '\n\n'), callback);
};

var getCommand = (room, command) => {
    var name;

    if (room.commands.hasOwnProperty(command)) {
        return command;
    }

    for (name in room.commands) {
        if (room.commands[name].alias.indexOf(command) !== -1) {
            return name;
        }
    }
};

exports.getRoom = getRoom;
exports.saveRoom = saveRoom;
exports.getCommand = getCommand;

