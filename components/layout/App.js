import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import ReactGA from 'react-ga';
import {settings} from 'Config';
import { Nav } from '@vitruvian-tech/app-studio-core/components/layout';
import * as Auth from '@vitruvian-tech/app-studio-core/reducers/Auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!Auth.isLoaded(getState())) {
      promises.push(dispatch(Auth.load()));
    }

    return Promise.all(promises);
  }
}])

@connect(state => ({user: state['@vitruvian-tech/app-studio-core'].Auth.user}), {logout: Auth.logout, pushState: push})

export default class extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    loaded: false
  };

  componentDidMount = () => this.setState({ loaded: true });

  componentWillMount = () => {
    const { ['@vitruvian-tech/app-studio-core']: { google: { analytics: ga } } } = settings;

    if (__CLIENT__ && ga.id) {
      ReactGA.initialize(ga.id, { debug: !!ga.debug });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/dashboard');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    const { children: page } = this.props;

    return (
      <div className={`${this.state.loaded ? '' : 'no-js'}`}>
        <Nav {...this.props} />
        {page}
      </div>
    );
  }
}