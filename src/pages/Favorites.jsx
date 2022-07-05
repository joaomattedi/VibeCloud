import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      musicsFav: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.isMount = true;
    this.setState({ loading: true }, async () => {
      if (this.isMount) {
        const musics = await getFavoriteSongs();
        this.setState({ musicsFav: musics, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  updateFavorites = async () => {
    if (this.isMount) {
      const favorites = await getFavoriteSongs();
      this.setState({ musicsFav: favorites });
    }
  }

  render() {
    const { loading, musicsFav } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        {musicsFav.map((element) => (<MusicCard
          key={ element.trackId }
          previewUrl={ element.previewUrl }
          trackName={ element.trackName }
          trackId={ element.trackId }
          updateFavorites={ this.updateFavorites }
          favorite={ musicsFav.some(({ trackId }) => trackId === element.trackId) }
        />))}
      </div>
    );
  }
}
