'use strict';

// ============== Packages ==============================
const express = require('express');
require('dotenv').config();
// const superagent = require('superagent');

// ============== App ===================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// ============== Routes ================================

app.get('/hello', (request, response) => {
  // const helloWorld = 'Hello World!';
  response.render('pages/index.ejs');
});

app.get('/searches', (request, response) => {
  // const helloWorld = 'Hello World!';
  response.render('pages/searches/new.ejs');
});

// ============== Initialization ========================
app.listen( PORT, () => console.log(`up on http://localhost:${PORT}`));
