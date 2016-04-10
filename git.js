'use strict';
/**
Only need:
    clone -> start level
    checkout -> load
    commit -> save
    merge -> force separate realities to coexist
    rebase -> change order of actions taken
    log -> read history of current reality
    branch -> look at parallel realities (no creating branches)
*/

var spawn = require('child_process').spawn;

var clone = (srcRepo, dir, callback) => {
    var gitClone = spawn('git', ['clone', srcRepo, dir]);
    gitClone.on('close', (code) => {
        callback(code);
    });
};

var checkout = (repoDir, branch, callback) => {
    var gitCheckout = spawn('git', ['checkout', branch], {cwd: repoDir});
    gitCheckout.on('close', (code) => {
        callback(code);
    });
};

var merge = (repoDir, branch, callback) => {
    var gitMerge = spawn('git', ['merge', '--no-edit', branch], {cwd: repoDir});
    gitMerge.on('close', (code) => {
        callback(code);
    });
};

var rebase = (repoDir, branch, callback) => {
    var gitRebase = spawn('git', ['rebase', branch], {cwd: repoDir});
    gitRebase.on('close', (code) => {
        callback(code);
    });
};

var commit = (repoDir, message, callback) => {
    var gitCommit = spawn('git', ['commit', '-m', message], {cwd: repoDir});
    gitCommit.on('close', (code) => {
        callback(code);
    });
};

var log = (repoDir, callback) => {
    var gitLog = spawn('git', ['log'], {cwd: repoDir}),
        data;

    gitLog.stdout.on('data', (d) => {
        data = d;
    });

    gitLog.on('close', (code) => {
        callback(code, data);
    });
};

var branch = (repoDir, callback) => {
    var gitBranch = spawn('git', ['branch'], {cwd: repoDir}),
        data;

    gitBranch.stdout.on('data', (d) => {
        data = d;
    });

    gitBranch.on('close', (code) => {
        callback(code, data);
    });
};

exports.clone = clone;
exports.checkout = checkout;
exports.merge = merge;
exports.rebase = rebase;
exports.commit = commit;
exports.log = log;
exports.branch = branch;

