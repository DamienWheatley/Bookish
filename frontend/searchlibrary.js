const pgp = require('pg-promise')(/*options*/)
const db = pgp(`postgres://${loginInfo.username}:${loginInfo.password}@localhost:5432/bookish`)

const loginInfo = require('./password.js').config;
const Title = require('./Title.js').Title;

function showLibraryCatalog(){
  db.query('SELECT * FROM Titles')
  .then(function (data) {
    let array = [];
    //function to make objects
    data.forEach( object => {
      array.push(new Title(object.isbn, object.title, object.author, object.genre))
      console.log(json); //Can add app.get block here to print to localhost 3000 ,  but need to delete the above app.get block
    })
     return Promise.all(array);
    .then();
  }
}
