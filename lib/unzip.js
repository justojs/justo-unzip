//imports
import path from "path";
import yauzl from "yauzl";
import fs from "fs";
import {File, Dir} from "justo-fs";

/**
 * Unzip a file.
 *
 * @param src:string  File to unzip.
 * @param dst:string  Directory where to unzip.
 */
export default function(src, dst, done) {
  yauzl.open(src, {lazyEntries: true}, function(err, zip) {
    //(1) pre
    if (err) return done(err);

    //(2) unzip
    zip.readEntry();
    zip.on("close", function() {
      done();
    });

    zip.on("entry", function(entry) {
      if (entry.fileName.endsWith("/")) {
        let dir = new Dir(dst, entry.fileName);

        if (!dir.exists()) dir.create();
        zip.readEntry();
      } else {
        let file = new File(dst, entry.fileName);
        let dir = file.parent;

        zip.openReadStream(entry, function(err, readStream) {
          if (err) return done(err);

          if (!dir.exists()) dir.create();
          readStream.pipe(fs.createWriteStream(file.path));
          readStream.on("end", function() {
            zip.readEntry();
          });
        });
      }
    });
  });
}
