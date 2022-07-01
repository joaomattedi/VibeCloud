import React, { Component } from 'react';
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
      </header>
    );
  }
}
