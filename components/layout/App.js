import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import ReactGA from 'react-ga';
import {Nav} from '@machete-platform/core-bundle/components/layout';
import * as Config from '@machete-platform/core-bundle/controllers/Config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];

    if (!state['@machete-platform/core-bundle'].Config['@machete-platform/core-bundle']) {
      promises.push(dispatch(Config.components('@machete-platform/core-bundle')));
    }

    return Promise.all(promises);
  }
}])

@connect(state => ({ config: state['@machete-platform/core-bundle'].Config['@machete-platform/core-bundle'] }))

export default class extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    config: PropTypes.object,
    nav: PropTypes.object
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

  render() {
    const { children: page, nav } = this.props;

    return (
      <div className={`${this.state.loaded ? '' : 'no-js'}`}>
        {nav || <Nav/>}
        {page}
      </div>
    );
  }
}
