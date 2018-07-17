import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {transition} from '@machete-platform/core-bundle/controllers/Transition';

const PROGRESS_SPEED = 500;
const PROGRESS_INTERVAL = .20;

@connect(state => ({ progress: state['@machete-platform/core-bundle'].Transition.progress }), { transition })

export default class extends Component {
  static propTypes = {
    progress: PropTypes.number,
    transition: PropTypes.func.isRequired,
  };

  state = {
    loading: false
  };

  timer = null;

  componentDidUpdate() {
    const { progress, transition } = this.props;
    const { loading } = this.state;

    clearTimeout(this.timer);

    if (progress === 1) {
      loading && setTimeout(() => this.setState({ loading: false }), PROGRESS_SPEED / 2);
      setTimeout(() => transition({ progress: 0 }), PROGRESS_SPEED);
    } else if (progress > 0) {
      !loading && this.setState({ loading: true });
      this.timer = setTimeout(() => transition({ progress: (progress + PROGRESS_INTERVAL) - (progress * PROGRESS_INTERVAL) }), PROGRESS_SPEED);
    }
  }

  render() {
    const { progress } = this.props;
    const { loading } = this.state;

    return (
      <section className={`progress-loader ${loading ? 'loading' : ''}`}>
        <div style={{ width: `${progress * 100}%` }}></div>
      </section>
    );
  }
}
