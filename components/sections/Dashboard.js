import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {Section} from '@machete-platform/core-bundle/components/layout';
import * as Auth from '@machete-platform/core-bundle/controllers/Auth';

@connect(state => ({user: state['@machete-platform/core-bundle'].Auth.user}), Auth)

export default class extends Section {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    return (user &&
      <Section>
        <h1>Dashboard</h1>

        <div>
          <p>Hi, {user.name}. You have just successfully logged in, and were forwarded here
            by <code>componentWillReceiveProps()</code> in <code>App.js</code>, which is listening to
            the auth reducer via redux <code>@connect</code>. How exciting!
          </p>

          <p>
            The same function will forward you to <code>/</code> should you chose to log out. The choice is yours...
          </p>

          <p>
            <LinkContainer to="/chat">
              <button className="btn btn-primary">Go to Chat</button>
            </LinkContainer>
          </p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </Section>
    );
  }
}
