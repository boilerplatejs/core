import React, {Component} from 'react';
import {Section} from '@machete-platform/core-bundle/components/layout';

export default class extends Section {
  render() {
    return (
      <Section className="text-center">
        <br />
        <h1>Page Not Found</h1>
        <h3>Do you even web surf?</h3>
      </Section>
    );
  }
}
