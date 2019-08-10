import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './components/list-books/ListBooks';
import SearchBooks from './components/search-books/SearchBooks';

const CURRENTLY_READING = 'currentlyReading';
const WANT_TO_READ = 'wantToRead';
const READ = 'read';
const NONE = 'none';

export default class BooksApp extends Component {
  state = {
    bookshelves: {
      currentlyReading: {
        id: CURRENTLY_READING,
        title: 'Currently Reading',
        books: []
      },
      wantToRead: {
        id: WANT_TO_READ,
        title: 'Want to Read',
        books: []
      },
      read: { id: READ, title: 'Read', books: [] }
    }
  };

  initializeBookshelves = () => {
    BooksAPI.getAll().then(books => {
      const allBooks = { currentlyReading: [], wantToRead: [], read: [] };

      books.forEach(book => {
        allBooks[book.shelf].push(book);
      });

      const { currentlyReading, wantToRead, read } = allBooks;

      this.setState(currentState => {
        currentState.bookshelves.currentlyReading.books = currentlyReading;
        currentState.bookshelves.wantToRead.books = wantToRead;
        currentState.bookshelves.read.books = read;
        return currentState;
      });
    });
  };

  getBookshelfWithoutBook = book => {
    let bookshelf;
    const { bookshelves } = this.state;
    book.shelf &&
      book.shelf !== NONE &&
      (bookshelf = bookshelves[book.shelf].books.filter(b => b.id !== book.id));

    return bookshelf;
  };

  changeBookCategory = (book, newShelf) => {
    this.setState(currentState => {
      const { bookshelves } = currentState;

      const oldBookshelf = this.getBookshelfWithoutBook(book);

      oldBookshelf && (bookshelves[book.shelf].books = oldBookshelf);
      newShelf !== NONE && bookshelves[newShelf].books.push(book);
      book.shelf = newShelf;

      return currentState;
    });
  };

  getBookCategory = book => {
    const { currentlyReading, wantToRead, read } = this.state.bookshelves;
    const allBooks = [
      ...currentlyReading.books,
      ...wantToRead.books,
      ...read.books
    ];

    const match = allBooks.filter(b => book.id === b.id);

    return match.length !== 0 ? match[0].shelf : NONE;
  };

  componentDidMount() {
    this.initializeBookshelves();
  }

  render() {
    const { bookshelves } = this.state;
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <ListBooks
              bookshelves={bookshelves}
              onChangeBook={(book, newCategory) =>
                this.changeBookCategory(book, newCategory)
              }
              getBookCategory={book => this.getBookCategory(book)}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              onChangeBook={(book, newCategory) =>
                this.changeBookCategory(book, newCategory)
              }
              getBookCategory={book => this.getBookCategory(book)}
            />
          )}
        />
      </div>
    );
  }
}
