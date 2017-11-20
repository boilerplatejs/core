import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import ReactGA from 'react-ga';
import { Nav } from '@vitruvian-tech/app-studio-core/components/layout';
import * as Auth from '@vitruvian-tech/app-studio-core/controllers/Auth';
import * as Config from '@vitruvian-tech/app-studio-core/controllers/Config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];

    if (!state['@vitruvian-tech/app-studio-core'].Config['@vitruvian-tech/app-studio-core']) {
      promises.push(dispatch(Config.components('@vitruvian-tech/app-studio-core')));
    }

    if (!Auth.isLoaded(state)) {
      promises.push(dispatch(Auth.load()));
    }

    return Promise.all(promises);
  }
}])

@connect(state => {
  const core = state['@vitruvian-tech/app-studio-core'];

  return {
    user: core.Auth.user,
    settings: core.Config['@vitruvian-tech/app-studio-core']
  };
}, {
  logout: Auth.logout,
  pushState: push
})

export default class extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    settings: PropTypes.object,
    load: PropTypes.func,
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
    const { google: { analytics: ga } } = this.props.settings;

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
