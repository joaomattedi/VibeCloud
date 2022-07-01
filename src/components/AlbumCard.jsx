import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const {
      // artistId,
      artistName,
      collectionId,
      collectionName,
      // collectionPrice,
      artworkUrl100,
      // releaseDate,
      // trackCount,
    } = this.props;
    return (
      <div className="Card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h2>{collectionName}</h2>
        <h3>{artistName}</h3>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          params={ collectionId }
          to={ `/album/${collectionId}` }
        >
          Link
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  // artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  // collectionPrice: PropTypes.number.isRequired,
  // releaseDate: PropTypes.string.isRequired,
  // trackCount: PropTypes.number.isRequired,
};
