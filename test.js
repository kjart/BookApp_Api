const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// const book = [
//   {
//     id: uuid.v4(),
//     name: 'Time Management',
//     author: 'Brian Tracy',
//     date: '25-10-2006',
//     ISBN: 83028329838233,
//     city: 'Florida',
//   },
// ];

// const data = JSON.stringify(book, null, 4);

// fs.writeFile(`${__dirname}/data/books.json`, data, (err) => {
//   if (err) throw err;
//   console.log('data written to books.js');
// });

// const newBook = {
//   id: 3,
//   name: 'Trials and tribulations',
//   author: 'Brian gamer',
//   date: '25-10-2008',
//   ISBN: 83028329838233,
//   city: 'Florida',
// };

// fs.readFile(`${__dirname}/data/books.json`, 'utf-8', (err, data) => {
//   if (err) throw err;
//   const books = JSON.parse(data);
//   books.push(newBook);
//   fs.writeFile(
//     `${__dirname}/data/books.json`,
//     JSON.stringify(books, null, 4),
//     (err) => {
//       if (err) throw err;
//       console.log('File has been updated');
//     }
//   );
// });
const obj = {
  name: 'Kjart',
  age: '10',
};

fs.access(`${__dirname}/data/book.json`);
