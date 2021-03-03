# Book App

**Author**: Lydia Minehan-Tubic
**Version**: 1.0.1

## Overview

For this application, I will implement a basic full-stack application for a book list which will include the ability to search the Google Books API, add books to a database, and then render those books from a PostgreSQL database. This application will also add the ability to update the details of a book or remove it from the collection.

## Getting Started

### Day 1 - Lab 11

1. As a user, I want my application to load quickly so that I have an enjoyable experience.
2. As a user, I want to search the Google Books API so that I can view the results of my search.
3. As a user, I want to be able to browse the search results.
4. As a user, I want to view any error messages that occur during the usage of my book list application so that I know if something has gone wrong.
5. As a user, I want a simple, clean looking UI so that my application is easy to navigate.
6. As a user, I want the application to have a home page, so that I can see see relevant information

### Day 2 - Lab 12

1. As a user, I want all of my saved books to be displayed on the home page so that I can view all of the books from my collection in a single view.
2. As a user, I want to request information about a single book so that I can view its additional details and share it by URL.
3. As a user, I want the ability to add new books to my application so that I can save search results.
4. As a user, I want the application to be designed in a consistent way so that I do not experience any down time or slow load times.
5. As a user, I want a simple, clean-looking UI so that my application is easy to navigate.
6. STRETCH: As a developer, I want to explore further functionality so that I can continue to improve the user's experience.
7. STRETCH: As a developer, I want to automatically populate the database so my application is functioning efficiently.

### Day 3 - Lab 13

1. As a user, I want to update the details of a book so that it displays the way I want it to, according to my personalized preferences.
2. As a user, I want to remove books from my collection so that it accurately represents my favorite books.
3. STRETCH: As a user, I want to organize my books by author so that I can view all of the books that a single author has written and view the details about their work.
4. STRETCH: As a user, I want to use sprite sheets for my form elements so that my form is unique.

### Day 4 - Lab 14

1. As a developer, I want to normalize the database to support browsing of bookshelves
2. STRETCH: As a developer, I want to alter the application to support the new database and allow the user to browse their bookshelves visually

## Architecture

Technologies used: HTML, CSS, JavaScript, pg, express, superagent, postman, SQL, ejs, json, git, node, Heroku

```SQL
book_app (repository)
├──data
│  ├── books.sql
│  └── seed.sql
├──public
│  ├── js
│  │   └── app.js
│  └── styles
│      ├── base.css
│      ├── layout.css
│      ├── modules.css
│      └── reset.css
├──views
│  ├── layout
│  │   ├── footer.ejs
│  │   ├── head.ejs
│  │   └── header.ejs
│  └── pages
│      ├── error.ejs
│      ├── index.ejs
│      ├── books
│      │   ├── detail.ejs
│      │   └── show.ejs
│      └── searches
│          ├── new.ejs
│          └── show.ejs
├── .env
├── .eslintrc.json
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Change Log

3-1-2021 2:30pm - Start of Day 1
3-1-2021 3:23pm - Server set up and CSS sheet linked
3-1-2021 3:38pm - created new.ejs and added search form
3-1-2021 6:06pm - got book object to render to page with EJS
3-1-2021 10:22pm - Made some edits with CSS
3-2-2021 2:30pm - Start of Day 2
3-2-2021 3:00pm - Set up database and connected to Heroku
3-2-2021 4:24pm - Added Saved Books page


## Time Estimate

* Number and name of feature: Day 1 - 6 Features
* Estimate of time needed to complete: 6
* Start time: 2:45pm
* Finish time: 10:30
* Actual time needed to complete: 5

* Number and name of feature: Day 2 - 6 Features
* Estimate of time needed to complete: 8
* Start time: 2:30pm
* Finish time: TBD
* Actual time needed to complete: TBD

## Credits and Collaborations
