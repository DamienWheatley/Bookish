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

loginInfo = require('./password.js').config;
Title = require('./Title.js').Title;

const pgp = require('pg-promise')(/*options*/)
const db = pgp(`postgres://${loginInfo.username}:${loginInfo.password}@localhost:5432/bookish`)



db.query('SELECT * FROM Titles')
  .then(function (data) {
    let array = [];
    //function to make objects
    data.forEach( object => {
      array.push(new Title(object.isbn, object.title, object.author, object.genre))
      let json = JSON.stringify(array);
      console.log(json); //Can add app.get block here to print to localhost 3000 ,  but need to delete the above app.get block
    })
    console.log('DATA:', array)
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
