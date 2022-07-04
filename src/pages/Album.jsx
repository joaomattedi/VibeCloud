import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      favorites: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    return getMusics(id)
      .then((data) => this.setState({ musics: data, artistInfo: data[0] }))
      .then(() => this.updateFavorites());
  }

  updateFavorites = async () => {
    const musicsFav = await getFavoriteSongs();
    this.setState({ favorites: musicsFav, loading: false });
  }

  render() {
    const { musics, artistInfo, favorites, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {artistInfo && (
            <>
              <div data-testid="artist-name">{artistInfo.artistName}</div>
              <div data-testid="album-name">{artistInfo.collectionName}</div>
            </>
          ) }
          {musics.length > 0
          && musics.filter(({ kind }) => kind === 'song').map((element) => (<MusicCard
            key={ element.trackId }
            previewUrl={ element.previewUrl }
            trackName={ element.trackName }
            trackId={ element.trackId }
            updateFavorites={ this.updateFavorites }
            favorite={ favorites.some(({ trackId }) => trackId === element.trackId) }
          />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
