//imports
const assert = require("assert");
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const unzip = require("../../../dist/es5/nodejs/justo-unzip/lib/unzip").default;

//suite
suite("#unzip()", function() {
  const DATA = "test/unit/data";
  var DST_DIR, DST;

  init({name: "*", title: "Create tmp dir"}, function() {
    DST_DIR = Dir.createTmpDir();
    DST = DST_DIR.path;
  });

  fin({name: "*", title: "Remove tmp dir"}, function() {
    DST_DIR.remove();
  });

  test("unzip(src, dst, done)", function(done) {
    assert(unzip(path.join(DATA, "file.zip"), path.join(DST), function() {
      file(DST, "a1.txt").must.exist();
      file(DST, "a1.txt").must.contain("The a1.txt content.");
      file(DST, "a2.txt").must.exist();
      file(DST, "a2.txt").must.contain("The a2.txt content.");
      file(DST, "b/b1.txt").must.exist();
      file(DST, "b/b1.txt").must.contain("The b1.txt content.");
      file(DST, "b/b2.txt").must.exist();
      file(DST, "b/b2.txt").must.contain("The b2.txt content.");

      done();
    }) === undefined);
  });
})();
