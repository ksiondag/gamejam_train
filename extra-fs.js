var fs = require('fs');
var path = require('path');

var extraFs = exports;

extraFs.copy = (target, copyPath, callback) => {
    if (!callback) {
        callback = () => null;
    }

    fs.readlink(target, (err, linkString) => {
        if (err) {
            fs.readFile(target, 'utf-8', (err, data) => {
                if (err) {
                    return callback(err);
                }
                fs.writeFile(copyPath, data, 'utf-8', (err) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(err);
                });
            });
        } else {
            fs.symlink(linkString, copyPath, (err) => {
                callback(err);
            });
        }
    });
};

extraFs.copyDir = (dir, copyDir, callback) => {
    if (!callback) {
        callback = () => null;
    }

    fs.readdir(dir, (err, list) => {
        if (err) {
            return callback(err);
        }
        fs.mkdir(copyDir, (err) => {
            var count,
                incrementCount;
            if (err) {
                return callback(err);
            }

            count = 0;

            incrementCount = (err) => {
                if (err) {
                    throw err;
                }

                count += 1;

                if (count === list.length) {
                    callback();
                }
            };

            list.forEach((localpath) => {
                var fullpath = path.join(dir, localpath);
                var fullcopy = path.join(copyDir, localpath);

                extraFs.copy(fullpath, fullcopy, (err) => {
                    if (err) {
                        extraFs.copyDir(fullpath, fullcopy, incrementCount);
                    } else {
                        incrementCount();
                    }
                });
            });
        });
    })
};

