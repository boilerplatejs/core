import ReactGA from 'react-ga';

export class Category {

  path = [];

  constructor(name, sources) {
    this.name = name;
    this.path = [this.name];

    sources.forEach(({ source, actions }) => {
      let key;

      if (source) {
        key = `_${source}`;

        this[key] = {};

        Object.defineProperty(this, source, {
          get: () => {
            this.path.push(source);
            return this[key];
          }
        });
      }

      actions.forEach(action => {
        Object.defineProperty(key ? this[key] : this, action, {
          get: () => {
            this.path.push(action);
            return this;
          }
        });
      });
    })
  }

  track = (label, value, options = {}) => {
    const { path } = this;
    const { nonInteraction } = options;

    ReactGA.event({
      category: path[0],
      action: path.join(':'),
      label: path.concat(label !== 'undefined' ? label : []).join(':'),
      value,
      nonInteraction
    });

    this.path = [this.name];
  }

};