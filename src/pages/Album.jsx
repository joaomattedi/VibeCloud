import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    return getMusics(id)
      .then((data) => this.setState({ musics: data, artistInfo: data[0] }));
  }

  render() {
    const { musics, artistInfo } = this.state;
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
          && musics.filter(({ kind }) => kind === 'song').map((element) => {
            if (element.wrapperType === 'collection') {
              return null;
            }
            return (<MusicCard
              key={ element.trackId }
              previewUrl={ element.previewUrl }
              trackName={ element.trackName }
            />);
          })}
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
