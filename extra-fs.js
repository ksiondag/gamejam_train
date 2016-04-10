var spawn = require('child_process').spawn;

var extraFs = exports;

extraFs.copyRF = (dir, copyDir, callback) => {
    var cp = spawn('cp', ['-rf', dir, copyDir]);
    cp.on('close', (code) => {
        callback(code);
    });
};

extraFs.removeRF = (dir, callback) => {
    var rm = spawn('rm', ['-rf', dir]);
    rm.on('close', (code) => {
        callback(code);
    });
};

