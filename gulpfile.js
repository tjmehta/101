var gulp = require('gulp');
var replace = require('gulp-replace');


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
var exportsAssignment = /^module.exports = /mg;

gulp.task('es6', function () {
  return gulp.src('*.js')
    .pipe(replace(requireCall, "import $1 from '$2';"))
    .pipe(replace(exportsAssignment, 'export default '))
    .pipe(gulp.dest('es6'));
});
