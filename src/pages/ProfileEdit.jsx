import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: undefined,
      buttonDisabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    getUser().then((data) => {
      this.setState({ loading: false, user: data });
    }).then(() => this.setState({ buttonDisabled: this.fieldsValidation() }));
  }

  onHandleChange = ({ target }) => {
    const { value, name } = target;
    const { user } = this.state;
    const newUser = { ...user };
    newUser[name] = value;
    this.setState({ user: newUser, buttonDisabled: this.fieldsValidation() });
  }

  fieldsValidation = () => {
    const { user } = this.state;
    const { name, image, email, description } = user;
    const emailCheck = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) && email !== '';
    if ((name !== '')
     && (image !== '')
     && emailCheck
     && (description !== '')) return false;
    return true;
  }

  onSaveButtonClick = async () => {
    const { user } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser(user);
      this.setState({ redirect: true, loading: false });
    });
  }

  render() {
    const { loading, user, buttonDisabled, redirect } = this.state;
    if (redirect) return <Redirect exact to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading
          ? <Loading />
          : (
            <form>
              <input
                type="text"
                data-testid="edit-input-name"
                name="name"
                onChange={ this.onHandleChange }
                value={ user.name }
              />
              <input
                type="email"
                data-testid="edit-input-email"
                name="email"
                onChange={ this.onHandleChange }
                value={ user.email }
              />
              <input
                type="text"
                data-testid="edit-input-description"
                name="description"
                onChange={ this.onHandleChange }
                value={ user.description }
              />
              <input
                type="text"
                data-testid="edit-input-image"
                name="image"
                onChange={ this.onHandleChange }
                value={ user.image }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
                onClick={ this.onSaveButtonClick }
              >
                Salvar perfil
              </button>
            </form>)}
      </div>
    );
  }
}
