/**
Game logic and state.

TODO:
Get current room
*/

// Node libraries in use
var fs = require('fs');

var CURRENT_ROOM = 'saveState/currentRoom.txt';

var initSaveState = (callback) => {
    fs.mkdir('saveState', () => {
        fs.readFile('assets/leverRoom.txt', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            fs.writeFile('saveState/leverRoom.txt', data, 'utf-8', (err) => {
                if (err) {
                    throw err;
                }
                fs.symlink('leverRoom.txt', CURRENT_ROOM, (err) => {
                    if (err) {
                        throw err;
                    }
                    callback(data);
                });
            });
        });
    });
};

var getRoom = (callback) => {
    fs.readFile(CURRENT_ROOM, 'utf-8', (err, data) => {
        if (err) {
            // Save state does not exist yet
            initSaveState(callback);
        } else {
            callback(data);
        }
    });
};

var saveRoom = (data, callback) => {
	fs.writeFile(CURRENT_ROOM, data, callback);
};

exports.getRoom = getRoom;
exports.saveRoom = saveRoom;

