import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      invalidAlbum: true,
    };
  }

  inputChecker = (event) => {
    const { value } = event.target;
    if (value.length >= 2) {
      return this.setState({ invalidAlbum: false });
    }
  }

  render() {
    const { invalidAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.inputChecker }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ invalidAlbum }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
