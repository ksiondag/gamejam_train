var spawn = require('child_process').spawn;

var extraFs = exports;

extraFs.copyDir = (dir, copyDir, callback) => {
    var cp = spawn('cp', ['-rf', dir, copyDir]);
    cp.on('close', (code) => {
        callback(code);
    });
};

