//- Server

const express = require('express')
const app = express()
const port = 3000 //for server
const listCatalogue = require('./index.js').listCatalogue;

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
    const template = fs.readFileSync( './catalogue.html' , {encoding: 'UTF-8'});
    let html = mustache.render( template, x);

    response.send(html)
    });
})

app.post('/AddTitle', (request, response) => {
  let fname = request.body.fname
  let lname = request.body.lname
  console.log( fname)
  response.send(fname + lname)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
