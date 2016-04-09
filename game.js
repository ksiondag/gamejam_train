/**
Game logic and state.

TODO:
Get current room
*/

// Node libraries in use
var fs = require('fs');

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
                fs.symlink('leverRoom.txt', 'saveState/currentRoom.txt',
                    (err) => {
                        if (err) {
                            throw err;
                        }
                        callback(data);
                    }
                );
            });
        });
    });
};

var getRoom = function (callback) {
    fs.readFile('saveState/currentRoom.txt', 'utf-8', (err, data) => {
        if (err) {
            // Save state does not exist yet
            initSaveState(callback);
        } else {
            callback(data);
        }
    });
};

exports.getRoom = getRoom;

