import React, { Component } from 'react';

export default class BookshelfChanger extends Component {
  state = {
    value: ''
  };
  handleShelfChange = e => {
    const { book, onChangeBook } = this.props;
    const newShelf = e.target.value;
    this.setState({ value: newShelf });

    onChangeBook(book, newShelf);
  };
  componentDidMount() {
    const { book, getBookCategory } = this.props;
    this.setState({ value: getBookCategory(book) });
  }

  render() {
    const { value } = this.state;
    return (
      <div className='book-shelf-changer'>
        <select value={value} onChange={this.handleShelfChange}>
          <option value='move' disabled>
            Move to...
          </option>
          <option value='currentlyReading'>Currently Reading</option>
          <option value='wantToRead'>Want to Read</option>
          <option value='read'>Read</option>
          <option value='none'>None</option>
        </select>
      </div>
    );
  }
}
