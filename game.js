/**
Game logic and state.
*/

// Node libraries in use
var fs = require('fs');
var path = require('path');

var extraFs = require('./extra-fs');

var rooms = [
    'bridgeRoom',
    'leverRoom'
];

var initSaveState = (callback) => {
    extraFs.copyDir('assets', 'saveState', () => {
        fs.writeFile('saveState/currentRoom.txt', `${rooms[0]}\n`, 'utf-8', (err) => {
            // TODO: make all the copied assets proper git directories
            var root = 'saveState/leverRoom';
            fs.rename(
                path.join(root, '/git'), path.join(root, '/.git'), (err) => {
                if (err) {
                    throw err;
                }
                getRoom(callback);
            });
        });
    });
};

var currentRoom = (callback) => {
    fs.readFile('saveState/currentRoom.txt', 'utf-8', (err, data) => {
        var roomString, remainingRooms;
        if (err) {
            return callback(err);
        }

        roomString = data.trim();
        remainingRooms = rooms.reverse();

        while (remainingRooms.pop() !== roomString) {}

        rooms = [roomString].concat(remainingRooms.reverse());

        callback(null, roomString);
    });
};

var getRoom = (callback) => {
    currentRoom((err, roomString) => {
        if (err) {
            // Save state does not exist yet
            return initSaveState(callback);
        }
        fs.readFile(path.join('saveState', roomString, 'info.json'), 'utf-8', (err, data) => {
            if (err) {
                throw err;
            } else {
                callback(
                    JSON.parse(data)
                );
            }
        });
    });
};

var passesWinCondition = (room) => {
    var thing;
    for (thing in room.winningState) {
        if (room.winningState[thing] !== room.state[thing]) {
            return false
        }
    }

    console.log(room.winningText);

    return true;
};

exports.getRoom = getRoom;
exports.currentRoom = currentRoom;
exports.passesWinCondition = passesWinCondition;
//exports.saveRoom = saveRoom;
//exports.getCommand = getCommand;

