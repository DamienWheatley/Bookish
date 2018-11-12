const express = require('express')
const app = express()
const port = 3000 //for server

const pgp = require('pg-promise')(/*options*/)
const db = pgp('postgres://bookish:bookworm@host:5432/bookish')

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })


app.get('/', (request, response) => {
user = request.query.user;
password = request.query.password;
response.send("Hello World");
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
