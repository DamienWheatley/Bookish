const loginInfo = require('./password.js').config;

const pgp = require('pg-promise')(/*options*/)
const db = pgp(`postgres://${loginInfo.username}:${loginInfo.password}@localhost:5432/bookish`)

const Title = require('./Title.js').Title;


function listCatalogue(){
  return db.query('SELECT * FROM Titles')
    .then(function (data) {
      let array = [];
      data.forEach( object => {
        array.push(new Title(object.isbn, object.title, object.author, object.genre))
        //Can add app.get block here to print to localhost 3000 ,  but need to delete the above app.get block
      })

      let json = JSON.stringify(array);
      return json;
    })
  }


  function listUsers(){
    return db.query('SELECT * FROM Users')
      .then(function (data) {
        let array = [];
        data.forEach( object => {
          array.push(new Title(object.isbn, object.title, object.author, object.genre))
          //Can add app.get block here to print to localhost 3000 ,  but need to delete the above app.get block
        })

        let json = JSON.stringify(array);
        return json;
      })
    }


exports.listCatalogue = listCatalogue;
