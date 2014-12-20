var basename = require('basename');
var clone = require('clone');
var gulp = require('gulp');
var replace = require('gulp-replace');
var stripComments = require('strip-comments');
var stream = require('through2').obj;

var findIndex = require('./find-index');


//
// `gulp`
// ------
// Runs `gulp es6`.
//

gulp.task('default', ['es6']);


//
// `gulp es6`
// ----------
// Converts CommonJS modules to ES6 modules through a simple search'n'replace – and pipes them to
// the directory es6/ . If we can't fully convert a module, we skip it to ensure a solid code base
// compatible with any ES6 environment and transpiler.
//
// In order to get converted, a function can't depend on anything but other 101/... functions. The
// `require` calls and `module` assignments must match the patterns `requireCall` and
// `exportsAssignment` defined below.
//

var requireCall = /^var ([^ ]+) = require\('(\.\/[a-z-]+)'\);$/mg;
var exportsAssignment = /^module\.exports = /mg;

gulp.task('es6', function () {
  var files = [];

  return gulp.src('*.js')

    // Do the simple search'n'replace.
    .pipe(replace(requireCall, "import $1 from '$2';"))
    .pipe(replace(exportsAssignment, 'export default '))

    // Skip a file if the string 'require(' or 'module.exports' is still there.
    .pipe(stream(function (file, encoding, done) {
      var rawContents = stripComments(file.contents.toString());
      if (/(^|\s)require\s*\(/.test(rawContents)) return done();
      if (/(^|\s)module\.exports[^w]/.test(rawContents)) return done();

      files.push(file);
      done();

    // Find modules which depend on skipped ones and remove them from the stream.
    }, function (done) {
      var safeFiles = (function removeUnrooted (files) {
        var availableModules = files.map(function (file) { return basename(file.path); });
        var unrootedIndex = findIndex(files, function isUnrooted (file) {
          var match;
          var importStatement = /import [^ ]+ from '.\/([a-z-]+)';/g;
          var contents = file.contents.toString();
          while ((match = importStatement.exec(contents))) {
            if (availableModules.indexOf(match[1]) == -1) return true;
          }
        });

        if (unrootedIndex >= 0) {
          files.splice(unrootedIndex, 1);
          return removeUnrooted(clone(files));
        }
        else return clone(files);
      })(files);

      safeFiles.forEach(this.push.bind(this));
      done();
    }))

    // Save the processed files.
    .pipe(gulp.dest('es6'));
});
