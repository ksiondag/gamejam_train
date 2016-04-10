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

var exec = require('child_process').exec;

var clone = (srcRepo, dir, callback) => {
    exec(`git clone ${srcRepo} ${dir}`, callback);
};

var checkout = (repoDir, branch, callback) => {
    exec(`git checkout ${branch}`, {cwd: repoDir}, callback);
};

var merge = (repoDir, branch, callback) => {
    exec(`git merge --no-edit ${branch}`, {cwd: repoDir}, callback);
};

var rebase = (repoDir, branch, callback) => {
    exec(`git rebase ${branch}`, {cwd: repoDir}, callback);
};

var commit = (repoDir, message, callback) => {
    exec(`git commit -m ${message}`, {cwd: repoDir}, callback);
};

var log = (repoDir, callback) => {
    exec(`git log --reverse`, {cwd: repoDir}, callback);
};

var branch = (repoDir, callback) => {
    exec(`git branch`, {cwd: repoDir}, callback);
};

exports.clone = clone;
exports.checkout = checkout;
exports.merge = merge;
exports.rebase = rebase;
exports.commit = commit;
exports.log = log;
exports.branch = branch;

