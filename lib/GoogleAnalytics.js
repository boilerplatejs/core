import ReactGA from 'react-ga';

export class Category {

  path = [];
  components = {};

  constructor(name, components) {
    this.name = name;
    this.path = [this.name];

    components.forEach(({ component, actions }) => {
      if (component) {
        this.components[component] = {}

        Object.defineProperty(this, component, {
          get: () => {
            const { path } = this;
            path.length === 1 && path.push(component);
            return this.components[component];
          }
        });
      }

      actions.forEach(action => {
        Object.defineProperty(component ? this.components[component] : this, action, {
          get: () => {
            const { path } = this;
            if (!component && path.length === 1) path.push('App');
            if (path.length === 2) path.push(action);
            return this;
          }
        });
      });
    })
  }

  label = (label = null, sources = ['']) => [this.path.join('.')].concat(sources.join(',')).concat(label === null ? [] : label).join(':');

  track = (label, sources, options = {}) => {
    const { path } = this;
    const action = path.join('.');
    const { nonInteraction, value } = options;

    label = this.label(label, sources);

    ReactGA.event({
      category: path[0],
      action,
      label,
      value,
      nonInteraction
    });

    this.path = [this.name];

    return label;
  }

};