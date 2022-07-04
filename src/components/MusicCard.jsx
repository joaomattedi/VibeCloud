import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  onHandleChange = (event) => {
    const { checked } = event.target;
    const { trackId, previewUrl, trackName, updateFavorites } = this.props;
    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong({ trackId, trackName, previewUrl });
        await updateFavorites();
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await removeSong({ trackId, trackName, previewUrl });
        await updateFavorites();
        this.setState({ loading: false });
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId, favorite } = this.props;
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id="favorite"
            onChange={ this.onHandleChange }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favorite: PropTypes.bool.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};
