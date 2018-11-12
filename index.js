//Pseudocode:
const pg = require('pg-promjies');

pg.query('INSERT INTO Books VALUES($1, $2)', ["Haary P", "JK"])
  .then(response => {
    var book = bookFromObject(response)
    console.log(book)
  });


function bookFromObject(object) {
  return new Book(object.title, )
}
