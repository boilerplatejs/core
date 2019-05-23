const LOAD = '@boilerplatejs/core/Session/LOAD';
const LOAD_SUCCESS = '@boilerplatejs/core/Session/LOAD_SUCCESS';
const LOAD_FAIL = '@boilerplatejs/core/Session/LOAD_FAIL';

const LOGIN = '@boilerplatejs/core/Session/LOGIN';
const LOGIN_SUCCESS = '@boilerplatejs/core/Session/LOGIN_SUCCESS';
const LOGIN_FAIL = '@boilerplatejs/core/Session/LOGIN_FAIL';

const LOGOUT = '@boilerplatejs/core/Session/LOGOUT';
const LOGOUT_SUCCESS = '@boilerplatejs/core/Session/LOGOUT_SUCCESS';
const LOGOUT_FAIL = '@boilerplatejs/core/Session/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

const filter = (namespace) => {
  const [bundle, service = 'Session'] = namespace.split(':');
  return !(bundle === '@boilerplatejs/core' && service === 'Session');
};

export function isLoaded(state) {
  return state['@boilerplatejs/core'] && state['@boilerplatejs/core'].Session && state['@boilerplatejs/core'].Session.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@boilerplatejs/core/Session/load')
  };
}

export function login(data) {
  const credentials = { data };
  const user = {};

  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: async client => {
      const services = await client.get('/@boilerplatejs/core/Config/session')
        .then(services => services.filter(filter));

      try {
        await Promise.all(services.map(namespace => {
          const [bundle, service = 'Session'] = namespace.split(':');

          return client.post(`/${bundle}/${service}/login`, credentials)
            .then(data => user[bundle] = Object.assign(user[bundle] || {}, { [service]: data }));
        }));
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }

      return client.post('/@boilerplatejs/core/Session/login', { data: user });
    }
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: async client => {
      const services = await client.get('/@boilerplatejs/core/Config/session')
        .then(services => services.filter(filter))
        .then(services => services.map(service => service.split(':')));

      try {
        await Promise.all(services.map(service => client.post(`/${service[0]}/${service[1] || 'Session'}/logout`)));
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }

      return client.post('/@boilerplatejs/core/Session/logout');
    }
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}
