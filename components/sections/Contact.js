import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {Section} from '@vitruvian-tech/app-studio-core/components/layout';
import * as forms from '@vitruvian-tech/app-studio-core/components/forms';
import {create} from '@vitruvian-tech/app-studio-core/controllers/Contact';

@connect(() => ({}), {initialize, create})

export default class extends Section {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    create: PropTypes.func
  };

  state = {
    data: null
  };

  submit = (values) => {
    const { initialize, create } = this.props;
    // initialize('contact', {});
    if (values.email) {
      create(values).then(data => this.setState({ data }));
    }
  };

  render() {
    const { data } = this.state;

    return (
      <Section>
        <h1>Contact</h1>
        {data ? <span>{JSON.stringify(data)}</span> : <forms.Contact onSubmit={this.submit}/>}
      </Section>
    );
  }
}
