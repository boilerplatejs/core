import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import NukaCarousel from 'nuka-carousel';
import ReactGA from 'react-ga';
import {transition} from '@machete-platform/core-bundle/controllers/Transition';
import {Footer} from '@machete-platform/core-bundle/components/layout';

// const concat = (...args) => {
//   return Array.prototype.concat.apply([], args).filter(item => !!item);
// };

@connect(state => ({ header: state['@machete-platform/core-bundle'].Transition.header || 0 }), {transition})

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
    ReactGA.pageview(this.props.location.pathname);
  }

  afterSlide = header => this.props.transition({ header });

  render() {
    const { children, sections, headers, className, config, title, meta, link, script, header } = this.props;
    const single = headers.length === 1;

    return (
      <section className={`${className} page`}>
        <Helmet title={config.title} meta={config.meta} link={config.link} script={config.script}/>
        <Helmet title={title} meta={meta} link={link} script={script}/>
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
