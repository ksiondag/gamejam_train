/**
Game logic and state.

TODO:
Get current room
*/

// Node libraries in use
var fs = require('fs');

var CURRENT_ROOM = 'saveState/currentRoom';

var initSaveState = (callback) => {
    fs.mkdir('saveState', () => {
    fs.mkdir('saveState/leverRoom', () => {
        fs.readFile('assets/leverRoom/info.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            fs.writeFile('saveState/leverRoom/info.json', data, 'utf-8', (err) => {
                if (err) {
                    throw err;
                }
                fs.symlink('leverRoom', CURRENT_ROOM, (err) => {
                    if (err) {
                        throw err;
                    }
                    callback(
                        JSON.parse(data)
                    );
                });
            });
        });
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

exports.getRoom = getRoom;
exports.saveRoom = saveRoom;

