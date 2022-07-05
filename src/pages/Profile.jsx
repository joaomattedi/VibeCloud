import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: undefined,
    };
  }

  componentDidMount() {
    getUser().then((data) => {
      this.setState({ loading: false, user: data });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {!loading ? (
          <>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <div>
              {user.name}
            </div>
            <div>
              {user.description}
            </div>
            <div>
              {user.email}
            </div>
            <Link to="/profile/edit">Editar perfil</Link>
          </>)
          : <Loading />}
      </div>
    );
  }
}
