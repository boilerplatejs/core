import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import ReactGA from 'react-ga';
import { Nav } from '@machete-platform/core-bundle/components/layout';
import * as Auth from '@machete-platform/core-bundle/controllers/Auth';
import * as Config from '@machete-platform/core-bundle/controllers/Config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];

    if (!state['@machete-platform/core-bundle'].Config['@machete-platform/core-bundle']) {
      promises.push(dispatch(Config.components('@machete-platform/core-bundle')));
    }

    if (!Auth.isLoaded(state)) {
      promises.push(dispatch(Auth.load()));
    }

    return Promise.all(promises);
  }
}])

@connect(state => {
  const core = state['@machete-platform/core-bundle'];

  return {
    user: core.Auth.user,
    config: core.Config['@machete-platform/core-bundle']
  };
}, {
  logout: Auth.logout,
  pushState: push
})

export default class extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    config: PropTypes.object,
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
    const { googleAnalyticsId: id, googleAnalyticsDebug: debug } = this.props.config;

    if (__CLIENT__ && id) {
      ReactGA.initialize(id, { debug: !!debug });
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
