// Generated by CoffeeScript 1.10.0
var Promise, asar, cp, dot, fs, path;

Promise = require('bluebird');

cp = require('child_process');

fs = require('fs-extra');

asar = require('asar');

path = require('path');

dot = require('dot');

module.exports = {
  exec: function(cmd, args, options) {
    return new Promise(function(resolve, reject) {
      return cp.execFile(cmd, args, options, function(error, stdout, stderr) {
        if (error) {
          return reject(error);
        } else {
          return resolve(stdout);
        }
      });
    });
  },
  getPackageJson: function(appDirectory) {
    var error, error1, error2;
    try {
      return JSON.parse(asar.extractFile(path.resolve(appDirectory, 'resources', 'app.asar'), 'package.json'));
    } catch (error1) {
      error = error1;
      try {
        return require(path.resolve(appDirectory, 'resources', 'app', 'package.json'));
      } catch (error2) {
        error = error2;
        throw new Error('Neither the resources/app folder nor the resources/app.asar package were found.');
      }
    }
  },
  getNuSpec: function(opts) {
    var template;
    template = fs.readFileSync(path.resolve(__dirname, '..', 'resources', 'template.nuspec'));
    template = dot.template(template.toString());
    return template(opts);
  },
  escape: function(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/@/g, '&#64;');
  }
};
