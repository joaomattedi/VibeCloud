import React, { Component } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      invalidLogin: true,
      user: {
        name: '',
      },
      loading: false,
      logged: false,
    };
  }

  componentDidMount = () => {
    this.isMount = true;
  }

  componentWillUnmount = () => {
    this.isMount = false;
  }

  loggingIn = () => {
    const { user } = this.state;
    this.setState({ loading: true });
    if (this.isMount) {
      return createUser(user).then(() => {
        if (this.isMount) {
          return this.setState({ loading: false },
            () => this.setState({ logged: true }));
        }
      });
    }
  }

  loginChecker = (event) => {
    const { value } = event.target;
    const min = 3;

    return ((value.length >= min)
      ? this.setState({ invalidLogin: false, user: { name: value } })
      : this.setState({ invalidLogin: true, user: { name: value } }));
  }

  render() {
    const { invalidLogin, loading, logged } = this.state;
    if (logged) return <Redirect to="/search" />;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login" className="loginContainer">
        <img src="./icons/iconeAzul.png" alt="Icone TrybeTunes" />
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.loginChecker }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ this.loggingIn }
          disabled={ invalidLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}
