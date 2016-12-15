import { exec } from 'child_process'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('deploy', 'deploy master branch', (cb) => {
  exec('git push origin master:gh-pages', (err, stdout, stderr) => {
    process.stdout.write(`${stdout}\n`)
    process.stdout.write(`${stderr}\n`)
    cb(err)
  })
})
