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
      <footer className={`${this.props.className} footer`}>
        {this.props.children}
      </footer>
    );
  }
}
