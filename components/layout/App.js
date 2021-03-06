import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect-react16';
import ReactGA from 'react-ga';
import {Nav} from '@boilerplatejs/core/components/layout';
import * as Config from '@boilerplatejs/core/actions/Config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];

    if (!state['@boilerplatejs/core'].Config['@boilerplatejs/core']) {
      promises.push(dispatch(Config.components('@boilerplatejs/core')));
    }

    return Promise.all(promises);
  }
}])

@connect(state => ({ config: state['@boilerplatejs/core'].Config['@boilerplatejs/core'] }))

export default class extends Component {
  static propTypes = {
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
    const { children: page, nav, config } = this.props;
    const { googleAnalyticsId } = config;

    return (
      <section className={`${this.state.loaded ? '' : 'no-js'}`}>
        {nav || <Nav/>}
        {page}
        {googleAnalyticsId && <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></script>
          <script dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');`}} />
        </>}
      </section>
    );
  }
}
