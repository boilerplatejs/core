import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Navbar from 'react-bootstrap/lib/Navbar';

export default class extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <Navbar {...this.props}>
        {this.props.children}
      </Navbar>
    );
  }
}
