//- Server

const express = require('express')
const app = express()
const port = 3000 //for server

app.get('/', (request, response) => {
user = request.query.user;
password = request.query.password;
response.send("Hello World");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//- Database

loginInfo = require('password.js')

const pgp = require('pg-promise')(/*options*/)
const db = pgp(`postgres://${loginInfo.username}:${loginInfo.password}@host:5432/bookish`)

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

// EXAMPLE CODE FROM EXPRESS/POSTGRES DOCUMENTATION
// db.one('SELECT $1 AS value', 123)
//   .then(function (data) {
//     console.log('DATA:', data.value)
//   })
//   .catch(function (error) {
//     console.log('ERROR:', error)
//   })
