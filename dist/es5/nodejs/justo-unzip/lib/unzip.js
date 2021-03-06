"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 











function (src, dst, done) {
  _yauzl2.default.open(src, { lazyEntries: true }, function (err, zip) {

    if (err) return done(err);


    zip.readEntry();
    zip.on("close", function () {
      done();});


    zip.on("entry", function (entry) {
      if (entry.fileName.endsWith("/")) {
        var dir = new _justoFs.Dir(dst, entry.fileName);

        if (!dir.exists()) dir.create();
        zip.readEntry();} else 
      {(function () {
          var file = new _justoFs.File(dst, entry.fileName);
          var dir = file.parent;

          zip.openReadStream(entry, function (err, readStream) {
            if (err) return done(err);

            if (!dir.exists()) dir.create();
            readStream.pipe(_fs2.default.createWriteStream(file.path));
            readStream.on("end", function () {
              zip.readEntry();});});})();}});});};var _path = require("path");var _path2 = _interopRequireDefault(_path);var _yauzl = require("yauzl");var _yauzl2 = _interopRequireDefault(_yauzl);var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);var _justoFs = require("justo-fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}