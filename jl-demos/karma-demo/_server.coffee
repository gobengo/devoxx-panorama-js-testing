#!/usr/bin/env coffee

express = require('express')
port = 4000

app = express()
app.use express.logger('dev')
app.use express.static "#{__dirname}/app"
app.listen port
console.log "Web server running on port #{port}."
