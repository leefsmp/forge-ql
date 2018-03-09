const path = require('path')
const fs = require('fs')

if (process.env.NODE_ENV === 'production') {

  require('./static')

} else {

  require('babel-core/register')({
    plugins: ["transform-decorators-legacy"],
    presets: ['env', 'stage-0'],
  })

  require('../server/src')
}