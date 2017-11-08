import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import NukaCarousel from 'nuka-carousel';
import ReactGA from 'react-ga';
import {Footer} from '@vitruvian-tech/app-studio-core/components/layout';
import {update} from '@vitruvian-tech/app-studio-core/reducers/Location';

const concat = (...args) => {
  return Array.prototype.concat.apply([], args).filter(item => !!item);
};

@connect(state => ({}), {update})

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
    update: PropTypes.func,
    children: PropTypes.any
  };

  static defaultProps = {
    className: ''
  };

  componentWillMount() {
    const { update, location, params } = this.props;
    update({ location, params });
  }

  componentDidMount() {
    ReactGA.pageview(this.props.location.pathname);
  }

  render() {
    const { children, sections, headers, className, config, title, meta, link, script } = this.props;
    const single = headers.length === 1;

    return (
      <section className={`${className} page`}>
        <Helmet title={config.title} meta={config.meta} link={config.link} script={config.script}/>
        <Helmet title={title} meta={meta} link={link} script={script}/>
        {children || <div>
          {headers.length ? (
            <section className={`${single ? 'single' : ''} header container`}>
              {single ? headers : (
                <NukaCarousel initialSlideWidth={970}>
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