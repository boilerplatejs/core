import React, { Component } from 'react';
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
      <section className={this.props.className + ' section'}>
        <div>
          <div>
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}
