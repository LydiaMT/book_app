'use strict';

// ============== Packages ==============================
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');


// ============== App ===================================
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// ============== Routes ================================

////////////Pathways//////////////////////
//-----catalog------
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
      console.log(singleBook);
      const ejsObject = { singleBook };
      response.render('pages/books/details.ejs', ejsObject);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

app.post('/books', (request, response) =>{
  const sqlString = 'INSERT INTO books (author, title, isbn, image_url, description) VALUES($1, $2, $3, $4, $5) RETURNING id';
  //pg does not automatically return the ID, so you need to add 'RETURNING id' to your sql string
  const sqlArray = [request.body.author, request.body.title, request.body.isbn, request.body.image_url, request.body.description];
  client.query(sqlString, sqlArray)
    .then((result) => {
      const singleBook = result.rows[0];
      console.log(result);
      response.redirect(`/books/${singleBook.id}`);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

//------editing catalog-----
app.get('/books/:id/edit', (request, response) =>{
  const bookId = request.params.id;
  const sqlString = 'SELECT * FROM books WHERE id=$1';
  const sqlArray = [bookId];
  client.query(sqlString, sqlArray)
    .then(result => {
      const singleBook = result.rows[0];
      const ejsObject = { singleBook };
      response.render('pages/books/edit.ejs', ejsObject);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

app.put('/books/:id', (request, response) => {
  const sqlString = 'UPDATE books SET author=$2, title=$3, isbn=$4, image_url=$5, description=$6 WHERE id=$1';
  const sqlArray = [request.params.id, request.body.author, request.body.title, request.body.isbn, request.body.image_url, request.body.description];
  client.query(sqlString, sqlArray)
    .then(() => {
      response.redirect(`/books/${request.params.id}`);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

app.delete('/books/:id', (request, response) => {
  const sqlString = `DELETE FROM books WHERE id=$1;`;
  const sqlArray = [request.params.id];
  client.query(sqlString, sqlArray)
    .then(response.redirect('/'))
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
});

//-----searches------
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
  this.image_url = '';
  this.title = '';
  this.author = '';
  this.description = '';
  this.isbn = '';
  if (bookData && bookData.volumeInfo){
    this.image_url = bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : "https://i.imgur.com/J5LVHEL.jpg";
    this.title = bookData.volumeInfo.title;
    this.author = bookData.volumeInfo.authors;
    this.description = bookData.volumeInfo.description;
    if(Array.isArray(bookData.volumeInfo.industryIdentifiers)){
      this.isbn = bookData.volumeInfo.industryIdentifiers[0].identifier;
      //some bookData instances did not have isbn which was throwing an error
    }
  }
}

// ============== Initialization ========================
client.connect().then(() => {
  app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
});
