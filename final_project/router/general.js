const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  if (isValid(req.body.username)) {
    users[req.body.username] = {
        "username":req.body.username,
        "password":req.body.password
        }
    }

    else {
        users.push({
            "username":req.body.username,
            "password":req.body.password
            });
    }
    res.send({"message":"Customer successfully registered. Now you can log in"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[`${isbn}`]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author_isbns = Object.keys(books);
    const author = req.params.author;
    let result = []

    for (let i = 0; i < author_isbns.length; i++) {
        if (books[author_isbns[i]]["author"] == author) {
            result.push({"isbn": author_isbns[i], "title":books[author_isbns[i]]["title"], "reviews":books[author_isbns[i]]["reviews"]});
        }
    }

    res.send({"booksbyauthor":result});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title_isbns = Object.keys(books);
    const title = req.params.title;
    let result = []

    for (let i = 0; i < title_isbns.length; i++) {
        if (books[title_isbns[i]]["title"] == title) {
            result.push({"isbn": title_isbns[i], "author":books[title_isbns[i]]["author"], "reviews":books[title_isbns[i]]["reviews"]});
        }
    }

    res.send({"booksbytitle":result});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[`${isbn}`]["reviews"]);
});

module.exports.general = public_users;
