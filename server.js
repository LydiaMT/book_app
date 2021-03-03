'use strict';

// ============== Packages ==============================
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');

// ============== App ===================================
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));

app.use(express.urlencoded({extended:true})); //tells express to peel off form data and put it into request.body
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// ============== Routes ================================

////////////Pathways//////////////////////
//-----homepage------
app.get('/', (request, response) => {
  const sqlString = 'SELECT * FROM books';
  const sqlArray = [];
  client.query(sqlString, sqlArray)
    .then(result => {
      const newBook = result.rows;
      const ejsObject = { newBook };
      response.render('pages/index.ejs', ejsObject);
    });
});

app.get('/books/:id' , (request, response) => {
  const bookId = request.params.id;
  const sqlString = 'SELECT * FROM books WHERE id=$1';
  const sqlArray = [bookId];
  client.query(sqlString, sqlArray)
    .then(result => {
      const singleBook = result.rows[0];
      const ejsObject = { singleBook };
      response.render('pages/books/details.ejs', ejsObject);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

//-----books------
app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new.ejs');
});

app.post('/searches', (request, response) => {
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
client.connect().then(() => {
  app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
});
