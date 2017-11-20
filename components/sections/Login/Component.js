import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Section} from '@vitruvian-tech/app-studio-core/components/layout';
import * as Auth from '@vitruvian-tech/app-studio-core/controllers/Auth';

@connect(state => ({user: state['@vitruvian-tech/app-studio-core'].Auth.user}), Auth)

export default class extends Section {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Component.scss');
    return (
      <Section className={styles.loginPage}>
        <h1>Login</h1>
        {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In</button>
            </form>
            <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
          </div>
        }
        {user &&
          <div>
            <p>You are currently logged in as {user.name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
            </div>
          </div>
        }
      </Section>
    );
  }
}
