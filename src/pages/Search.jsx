import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      invalidAlbum: true,
      loading: false,
      albumArtist: '',
      albums: [],
      noAlbums: false,
    };
  }

  inputChecker = (event) => {
    const { value } = event.target;
    if (value.length >= 2) {
      return this.setState({ invalidAlbum: false, albumArtist: value });
    }
    return this.setState({ invalidAlbum: true, albumArtist: value });
  }

  searchAlbums = () => {
    const { albumArtist } = this.state;
    this.setState({ loading: true }, () => {
      searchAlbumsAPI(albumArtist)
        .then((data) => {
          this.setState({ loading: false, albums: data });
          if (data.length === 0) {
            this.setState({ noAlbums: true });
          }
        });
    });
  }

  render() {
    const { invalidAlbum, loading, albums, albumArtist, noAlbums } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.inputChecker }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ invalidAlbum }
            onClick={ this.searchAlbums }
          >
            Pesquisar
          </button>
        </div>
        {!noAlbums
          ? (
            <div>
              <h2>{`Resultado de álbuns de: ${albumArtist}`}</h2>
              {albums.map((element, index) => <AlbumCard key={ index } { ...element } />)}
            </div>)
          : <div>Nenhum álbum foi encontrado</div>}
      </div>
    );
  }
}
