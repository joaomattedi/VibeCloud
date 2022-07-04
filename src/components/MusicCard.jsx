import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  onHandleChange = (event) => {
    const { checked } = event.target;
    const { trackId } = this.props;
    if (checked) {
      this.setState({ loading: true, checked: true }, async () => {
        await addSong(trackId);
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true, checked: false }, async () => {
        await removeSong(trackId);
        this.setState({ loading: false });
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
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
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
