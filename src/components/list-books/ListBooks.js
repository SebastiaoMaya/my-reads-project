import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../bookshelf/Bookshelf';
import BulkChange from '../bulk-change/BulkChange';

export default class ListBooks extends Component {
  static propTypes = {
    bookshelves: PropTypes.object.isRequired,
    onChangeBook: PropTypes.func.isRequired,
    getBookCategory: PropTypes.func.isRequired
  };

  state = {
    bulkChangeMode: false
  };

  changeBulkChangeButton = () => {
    this.setState(currentState => ({
      bulkChangeMode: !currentState.bulkChangeMode
    }));
  };

  renderBookshelves = bookshelves => {
    const allBookshelves = [];
    const { onChangeBook, getBookCategory } = this.props;

    for (const key in bookshelves) {
      if (bookshelves.hasOwnProperty(key)) {
        allBookshelves.push(
          <Bookshelf
            key={key}
            bookshelf={bookshelves[key]}
            onChangeBook={onChangeBook}
            getBookCategory={getBookCategory}
          />
        );
      }
    }
    return allBookshelves;
  };
  render() {
    const { bookshelves } = this.props;
    const { bulkChangeMode } = this.state;
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <BulkChange
            bulkStatusChange={this.changeBulkChangeButton}
            bulkModeActive={bulkChangeMode}
          />

          <div>{this.renderBookshelves(bookshelves)}</div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}
