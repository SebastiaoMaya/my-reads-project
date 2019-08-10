import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import AddBookToBookshelf from './components/add-book-to-bookshelf/AddBookToBookshelf';
import ListBooks from './components/list-books/ListBooks';

export default class BooksApp extends Component {
  state = {
    bookshelves: {
      currentlyReading: {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: []
      },
      wantToRead: {
        id: 'wantToRead',
        title: 'Want to Read',
        books: []
      },
      read: { id: 'read', title: 'Read', books: [] }
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
          render={() => <ListBooks bookshelves={bookshelves} />}
        />
        <Route path='/search' render={() => <AddBookToBookshelf />} />
      </div>
    );
  }
}
