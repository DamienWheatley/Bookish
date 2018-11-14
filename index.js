const loginInfo = require('./password.js').config;
const moment = require('moment')
const pgp = require('pg-promise')(/*options*/)
const db = pgp(`postgres://${loginInfo.username}:${loginInfo.password}@localhost:5432/bookish`)

const Title = require('./Title.js').Title;
const User = require('./User.js').User;
const UserLoan = require('./UserLoan.js').UserLoan;



function listCatalogue(){
  return db.query('SELECT * FROM Titles ORDER BY title, author;')
    .then(function (data) {
      let array = [];
      data.forEach( object => {
        array.push(new Title(object.isbn, object.title, object.author, object.genre))
      })
      return {
        titles: array
      };
    })
  }


  function addTitle(isbn, title, author, genre){
    db.query(`INSERT INTO Titles VALUES ('${isbn}', '${title}', '${author}', '${genre}');`)
    return 'Book added to Bookish database'
    }


  function getUserID(forename, surname){
    return db.query(`SELECT user_id, forename, surname FROM Users WHERE forename = '${forename}' AND surname = '${surname}'`)
    .then(function (data) {
      let user = new User(data[0].forename, data[0].surname, data[0].user_id)
      return user;
    })

  }

// getUserID('Bloggs', 'Bob').then(x =>{console.log(x)})





  function getUserLoans(id){
    return db.query(`SELECT Loans.loan_id, Loans.loan_date, Loans.return_date, Loans.user_id, Users.forename, Users.surname, Loans.book_id, Titles.title, Books.isbn\
    FROM Loans\
    JOIN Books\
    ON Loans.book_id = Books.book_id\
    JOIN Titles\
    ON Books.isbn = Titles.isbn\
    JOIN Users\
    ON Loans.user_id = Users.user_id\
    WHERE Users.user_id = ${id};`)
    .then(function (data) {
      let array = [];
      data.forEach( object => {
        array.push(new UserLoan(object.loan_id, object.user_id, moment(object.loan_date).format('L'), moment(object.return_date).format('L'), object.forename, object.surname, object.book_id, object.title, object.isbn))
      })
      return {
        forename : data[0].forename,
        surname : data[0].surname,
        usersloans: array,
      };
    })

  }


  function searchByAuthor(string){
    return db.query(`SELECT author, title, isbn, genre\
      FROM Titles\
      WHERE author = '${string}';`)
    .then(function (data) {
      let titles = [];
      data.forEach( object => {
        titles.push(new Title(object.isbn, object.title, object.author, object.genre));
      })
      return {
        titles: titles,
      };
    })
  }

  function searchByTitle(string){
    return db.query(`SELECT author, title, isbn, genre\
      FROM Titles\
      WHERE title = '${string}';`)
    .then(function (data) {
      let titles = [];
        data.forEach( object => {
          titles.push(new Title(object.isbn, object.title, object.author, object.genre))
        })
      return {
        titles : titles
      }
    })
  }

exports.listCatalogue = listCatalogue;
exports.addTitle = addTitle;
exports.getUserID = getUserID;
exports.getUserLoans = getUserLoans;
exports.searchByAuthor = searchByAuthor;
exports.searchByTitle = searchByTitle;
