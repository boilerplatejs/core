import ReactGA from 'react-ga';

export default class GoogleAnalytics {

  static event(data, fn = () => {}) {
    return (...args) => {
      ReactGA.event(data);
      return fn.apply(this, args);
    };
  }

  static track(...args) {
    return GoogleAnalytics.event(...args)();
  }

}
