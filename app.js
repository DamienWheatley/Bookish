//- Server

const express = require('express')
const app = express()
const port = 3000 //for server
const listCatalogue = require('./index.js').listCatalogue;


app.use(express.static('frontend'));

app.get('/Catalogue', (request, response) => {
  let output = listCatalogue();
  output.then( x => {response.send(x)});
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
