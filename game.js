/**
Game logic and state.
*/

// Node libraries in use
var fs = require('fs');
var path = require('path');

var extraFs = require('./extra-fs');

var rooms = [
    'basicRoom',
    'leverRoom',
    'bridgeRoom'
];

var saveCurrentRoom = (callback) => {
    fs.writeFile('saveState/currentRoom.txt', `${rooms[0]}\n`, 'utf-8', callback);
};

var initSaveState = (callback) => {
    extraFs.copyRF('assets', 'saveState', (code) => {
        if (code) {
            throw code;
        }
        saveCurrentRoom((err) => {
            if (err) {
                throw err;
            }
            resetCurrentRoom((code) => {
                if (code) {
                    throw code;
                }
                getRoom(callback);
            });
        });
    });
};

var resetCurrentRoom = (callback) => {
    currentRoom((err, roomString) => {
        var room = `saveState/${roomString}`;
        extraFs.removeRF(`${room}/.git`, () => {
            extraFs.copyRF(`${room}/git`, `${room}/.git`, () => {
                extraFs.copyRF(`${room.replace('saveState', 'assets')}/info.json`, `${room}/`, callback);
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

var passesWinCondition = (room, callback) => {
    var thing, updatingRooms;
    for (thing in room.winningState) {
        if (room.winningState[thing] !== room.state[thing]) {
            return false
        }
    }

    console.log(room.winningText);

    updatingRooms = rooms.reverse()
    updatingRooms.pop();
    rooms = updatingRooms.reverse();

    if (rooms.length > 0) {
        saveCurrentRoom(() => {
            resetCurrentRoom(callback);
        });
    }
    else
    {
    	console.log('You won the game.');
    	require('./main').quit();
    }

    return true;
};

exports.getRoom = getRoom;
exports.resetCurrentRoom = resetCurrentRoom;
exports.currentRoom = currentRoom;
exports.passesWinCondition = passesWinCondition;

