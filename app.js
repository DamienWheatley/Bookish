//- Server
const express = require('express')
const listCatalogue = require('./index.js').listCatalogue;
const addTitle = require('./index.js').addTitle;
const getUserID = require('./index.js').getUserID;
const getUserLoans = require('./index.js').getUserLoans;
<<<<<<< HEAD
const searchByTitle = require('./index.js').searchByTitle;
const searchByAuthor = require('./index.js').searchByAuthor;



=======
>>>>>>> Damien
const mustache = require('mustache');
const fs = require('fs');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken')

// let secret = bookish;

// let token = jwt.sign( {username},secret)

const app = express()
const port = 3000 //for server

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(express.static('frontend'));

app.get('/login', (req,res) => {
  let x = "5";
  res.send(x)
})

app.get('/Catalogue', (request, response) => {
  let output = listCatalogue();
  output.then( x => {
    const template = fs.readFileSync( './frontend/catalogue.html' , {encoding: 'UTF-8'});
    let html = mustache.render( template, x);
    response.send(html)
    });
})

app.get('/AddTitle', (request, response) => {
    response.send(fs.readFileSync( './frontend/addtitle.html' , {encoding: 'UTF-8'}))
})

app.post('/AddTitle', (request, response) => {
  let title = request.body.title;
  let author = request.body.author;
  let genre = request.body.genre;
  let isbn = request.body.isbn;
  addTitle(isbn, title, author, genre);

  response.redirect(302, "/index.html")

})

app.get('/Loans', (request, response) => {
    response.send(fs.readFileSync( './frontend/loans.html' , {encoding: 'UTF-8'}))
})

app.post('/Loans', (request, response) => {
  let forename = request.body.forename;
  let surname = request.body.surname;
  getUserID(forename, surname).then( user => {
    return getUserLoans(user.user_id)
  })
<<<<<<< HEAD
  .then( x => {
    const template = fs.readFileSync( './frontend/usersloans.html' , {encoding: 'UTF-8'});
    let html = mustache.render( template, x);
=======
  .then( userloans => {
    const template = fs.readFileSync( './frontend/usersloans.html' , {encoding: 'UTF-8'});
    let html = mustache.render( template, userloans);
>>>>>>> Damien
    response.send(html)
  })
})


app.post('/Search', (request, response) => {
    let queryString = request.body.queryString,
        queryType = request.body.queryType;
    let result
    switch (queryType) {
      case 'author':
        result = searchByAuthor(queryString);
        break;
      case 'title':
        result = searchByTitle(queryString);
        break;
      default:
        break;
    }
    result.then( x => {
      const template = fs.readFileSync( './frontend/searchresults.html' , {encoding: 'UTF-8'});
      let html = mustache.render( template, x);
      response.send(html)
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
