const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const ErrorResponse = require('../utils/errorResponse');

// @desc       Get all books
// @route      Get  /api/v1/books
// @access     Public

exports.getBooks = (req, res, next) => {
  //read all file from storage
  fs.readFile(
    `${path.dirname(__dirname)}/data/books.json`,
    'utf-8',
    (err, data) => {
      //error
      if (err) {
        res.status(400).json({ success: false });
      } else {
        //show all books
        const books = JSON.parse(data);
        res.status(200).json({
          sucess: true,
          books,
        });
      }
    }
  );
};

// @desc       Get single book
// @route      Get  /api/v1/books/:id
// @access     Public

exports.getBook = (req, res, next) => {
  fs.readFile(
    `${path.dirname(__dirname)}/data/books.json`,
    'utf-8',
    (err, data) => {
      //check if url is correct
      if (err) {
        return next(new ErrorResponse('File directory not found', 404));
        //return res.status(400).json({ success: false });
      } else {
        const books = JSON.parse(data);
        let getBook;
        books.forEach((book) => {
          //check id
          if (book.id === req.params.id) {
            getBook = book;
          }
        });
        //check if result is null
        if (!getBook) {
          //return a 404 of not found
          return next(
            new ErrorResponse(
              `There is no record of the book with id: ${req.params.id}`,
              404
            )
          );
          // return res.status(404).json({
          //   sucess: false,
          //   msg: `There is no record of the book with id: ${req.params.id}`,
          // });
        }
        res.status(200).json({
          success: true,
          data: getBook,
        });
      }
    }
  );
};

// @desc       Create book
// @route      POST  /api/v1/books/:id
// @access     Public
exports.createBook = (req, res, next) => {
  req.body.id = uuid.v4();
  //Extract parent directory path
  let dir = path.dirname(__dirname);
  //read the data from file
  fs.readFile(`${dir}/data/books.json`, 'utf-8', (err, data) => {
    if (err) throw err;

    //convert data to an array of object
    const books = JSON.parse(data);
    //push data into the array
    books.push(req.body);
    //write data back to file
    fs.writeFile(
      `${dir}/data/books.json`,
      JSON.stringify(books, null, 4),
      (err) => {
        if (err) throw err;
      }
    );
  });

  //return
  res.status(201).json({
    sucess: true,
    data: req.body,
  });
};

// @desc       Update single book
// @route      Put  /api/v1/books/:id
// @access     Public
exports.updateBook = (req, res, next) => {
  //retrieve id from request
  const id = req.params.id;
  //read data from storage
  fs.readFile(
    `${path.dirname(__dirname)}/data/books.json`,
    'utf-8',
    (err, data) => {
      //check if url is correct
      if (err) {
        return res.status(400).json({ success: false });
      } else {
        const books = JSON.parse(data);
        let getBook;
        books.forEach((book, index) => {
          //check id
          if (book.id === id) {
            req.body.id = id;
            getBook = req.body;
            //replace updated element in file storage
            books.splice(index, 1, getBook);
            fs.writeFile(
              `${path.dirname(__dirname)}/data/books.json`,
              JSON.stringify(books, null, 4),
              (err) => {
                if (err) throw err;
              }
            );
          }
        });
        //check if result is null
        if (!getBook) {
          //return a 404 of not found
          return res.status(404).json({
            sucess: false,
            msg: `There is no record of the book with id: ${req.params.id}`,
          });
        }
        res.status(200).json({
          success: true,
          data: getBook,
        });
      }
    }
  );
};

// @desc       Delete single book
// @route      DELETE  /api/v1/books/:id
// @access     Public
exports.deleteBook = (req, res, next) => {
  // retrieve id from request
  const id = req.params.id;
  //read data from storage
  fs.readFile(
    `${path.dirname(__dirname)}/data/books.json`,
    'utf-8',
    (err, data) => {
      //check if url is correct
      if (err) {
        return res.status(400).json({ success: false });
      } else {
        const books = JSON.parse(data);
        let getBook;
        books.forEach((book, index) => {
          //check id
          if (book.id === id) {
            getBook = book;
            //replace updated element in file storage
            books.splice(index, 1);
            fs.writeFile(
              `${path.dirname(__dirname)}/data/books.json`,
              JSON.stringify(books, null, 4),
              (err) => {
                if (err) throw err;
              }
            );
          }
        });
        //check if result is null
        if (!getBook) {
          //return a 404 of not found
          return res.status(404).json({
            sucess: false,
            msg: `There is no record of the book with id: ${req.params.id}`,
          });
        }
        res.status(200).json({
          success: true,
          data: `The book with id: ${req.params.id} is deleted succesfully`,
        });
      }
    }
  );
};
