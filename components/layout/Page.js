import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import NukaCarousel from 'nuka-carousel';
import ReactGA from 'react-ga';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {Footer} from '@boilerplatejs/core/components/layout';

// const concat = (...args) => {
//   return Array.prototype.concat.apply([], args).filter(item => !!item);
// };

@connect(state => ({
  header: state['@boilerplatejs/core'].Transition.header || 0,
  pageviews: state['@boilerplatejs/core'].Transition.pageviews || 0
}), {transition})

export default class extends Component {

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    meta: PropTypes.array,
    link: PropTypes.array,
    script: PropTypes.array,
    location: PropTypes.object,
    params: PropTypes.object,
    config: PropTypes.object,
    headers: PropTypes.any,
    pageviews: PropTypes.number,
    sections: PropTypes.array,
    options: PropTypes.object,
    children: PropTypes.any,
    header: PropTypes.number.isRequired,
    transition: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ''
  };

  componentDidMount() {
    const { transition, pageviews, location } = this.props;

    if (pageviews) {
      ReactGA.pageview(location.pathname);
    }

    if (global.scrollTo) {
      global.scrollTo(0, 0);
    }

    transition('pageviews', pageviews + 1);
    transition({ progress: 1 });
  }

  afterSlide = header => this.props.transition({ header });

  render() {
    const { children, sections, headers, className, config, title, meta, link, script, header } = this.props;
    const single = headers.length === 1;

    return (
      <section className={`${className} page`}>
        <Helmet title={title || config.title} meta={config.meta} link={config.link} script={config.script}/>
        <Helmet title={title || config.title} meta={meta} link={link} script={script}/>
        {children || <div>
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
            {sections}
          </section>
          <Footer/>
        </div>}
      </section>
    );
  }
}
