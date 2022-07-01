import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      user: {},
    };
  }

  componentDidMount = async () => {
    const userFound = await getUser();
    this.setState(() => ({ logged: true, user: userFound }));
  }

  render() {
    const { user: { name }, logged } = this.state;
    if (!logged) return <Loading />;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">{name}</h3>
        <nav>
          <Link to="/search" data-testid="link-to-search">SEARCH</Link>
          <Link to="/favorites" data-testid="link-to-favorites">FAVORITES</Link>
          <Link to="/profile" data-testid="link-to-profile">PROFILE</Link>
        </nav>
      </header>
    );
  }
}
