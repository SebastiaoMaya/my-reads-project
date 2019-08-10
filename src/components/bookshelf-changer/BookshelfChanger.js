import React, { Component } from 'react';

export default class BookshelfChanger extends Component {
  state = {
    value: ''
  };
  handleShelfChange = e => {
    this.setState({ value: e.target.value });
  };
  componentDidMount() {
    const { book } = this.props;
    this.setState({ value: book.shelf });
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
