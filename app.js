//- Server

const express = require('express')
const app = express()
const port = 3000 //for server
const listCatalogue = require('./index.js').listCatalogue;
const addTitle = require('./index.js').addTitle;

const mustache = require('mustache');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(express.static('frontend'));

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

  response.send(console.log("completed"))

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
