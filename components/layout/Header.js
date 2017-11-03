import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <header className={`${this.props.className} header`}>
        {this.props.children}
      </header>
    );
  }
}
