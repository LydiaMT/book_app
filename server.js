'use strict';

// ============== Packages ==============================
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');

// ============== App ===================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true})); //tells express to peel off form data and put it into request.body
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// ============== Routes ================================

////////////Pathways//////////////////////
//-----test------
app.get('/index.ejs', (request, response) => {
  response.render('pages/index.ejs');
});

//-----books------
app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new.ejs');
});

app.post('/searches/new', (request, response) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=in${request.body.search}:${request.body.search_input}`;
  superagent.get(url)
    .then(bookThatComesBack => {
      const bookArray = bookThatComesBack.body.items.map( bookValue => new Books(bookValue));
      response.render('pages/searches/show.ejs', {bookArray: bookArray});
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

////////////Objects//////////////////////
function Books(bookData){
  this.image = bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.smallThumbnail : "https://i.imgur.com/J5LVHEL.jpg";
  this.title = bookData.volumeInfo.title;
  this.author = bookData.volumeInfo.authors;
  this.description = bookData.volumeInfo.description;
}

// ============== Initialization ========================
app.listen( PORT, () => console.log(`up on http://localhost:${PORT}/index.ejs`));
