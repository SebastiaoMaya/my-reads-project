import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './components/list-books/ListBooks';
import SearchBooks from './components/search-books/SearchBooks';
import * as Constants from './constants';

export default class BooksApp extends Component {
  state = {
    bookshelves: {
      currentlyReading: {
        id: Constants.CURRENTLY_READING,
        title: Constants.CURRENTLY_READING_NAME,
        books: []
      },
      wantToRead: {
        id: Constants.WANT_TO_READ,
        title: Constants.WANT_TO_READ_NAME,
        books: []
      },
      read: { id: Constants.READ, title: Constants.READ_NAME, books: [] }
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

  changeBookCategory = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      this.setState(currentState => {
        const { bookshelves } = currentState;
        const bookshelf = this.getBookCategory(book);

        const oldBookshelf =
          bookshelf !== Constants.NONE
            ? bookshelves[bookshelf].books.filter(b => b.id !== book.id)
            : null;

        //validation in case there is no bookshelf (none for example)
        oldBookshelf && (bookshelves[bookshelf].books = oldBookshelf);

        //if the new shelf isnt none then add the book
        book.shelf = newShelf;
        newShelf !== Constants.NONE && bookshelves[newShelf].books.push(book);

        return currentState;
      });
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

    return match.length !== 0 ? match[0].shelf : Constants.NONE;
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
