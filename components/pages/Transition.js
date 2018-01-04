import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {VelocityTransitionGroup} from 'velocity-react';
import NukaCarousel from 'nuka-carousel';
import {Page, Header, Footer} from '@machete-platform/core-bundle/components/layout';
import {transition} from '@machete-platform/core-bundle/controllers/Transition';

@connect(state => ({
  section: state['@machete-platform/core-bundle'].Transition.section || 0,
  header: state['@machete-platform/core-bundle'].Transition.header || 0
}), {transition})

export default class extends Page {
  static propTypes = {
    transition: PropTypes.func.isRequired,
    section: PropTypes.number.isRequired,
    className: PropTypes.string,
    classNames: PropTypes.object,
    header: PropTypes.number.isRequired
  };

  static defaultProps = {
    className: '',
    classNames: {}
  };

  state = {
    animating: false
  };

  afterSlide = header => this.props.transition({ header });

  begin = () => this.setState({ animating: true });

  complete = () => this.setState({ animating: false });

  render() {
    const { headers, sections, section, className, classNames = {}, header } = this.props;
    const { animating } = this.state;
    const single = headers.length === 1;

    return (
      <Page className={`${className} ${animating ? `${classNames.animating || ''} animating` : ''}`} {...this.props}>
        {headers.length ? (
          <section className={`${single ? 'single' : ''} header container`}>
            {single ? headers : (
              <NukaCarousel initialSlideWidth={970} afterSlide={this.afterSlide} slideIndex={header}>
                {headers}
              </NukaCarousel>
            )}
          </section>
        ) : <span/>}
        <section className="section container">
          <VelocityTransitionGroup enter={{ easing: [ 0.17, 0.67, 0.83, 0.67 ], animation: 'transition.fadeIn', duration: 750, begin: this.begin, complete: this.complete }}>
            {sections[section]}
          </VelocityTransitionGroup>
        </section>
        <Footer/>
      </Page>
    );
  }
}
