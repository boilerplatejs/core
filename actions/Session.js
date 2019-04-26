const LOAD = '@machete-platform/core-bundle/Session/LOAD';
const LOAD_SUCCESS = '@machete-platform/core-bundle/Session/LOAD_SUCCESS';
const LOAD_FAIL = '@machete-platform/core-bundle/Session/LOAD_FAIL';

const LOGIN = '@machete-platform/core-bundle/Session/LOGIN';
const LOGIN_SUCCESS = '@machete-platform/core-bundle/Session/LOGIN_SUCCESS';
const LOGIN_FAIL = '@machete-platform/core-bundle/Session/LOGIN_FAIL';

const LOGOUT = '@machete-platform/core-bundle/Session/LOGOUT';
const LOGOUT_SUCCESS = '@machete-platform/core-bundle/Session/LOGOUT_SUCCESS';
const LOGOUT_FAIL = '@machete-platform/core-bundle/Session/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export function isLoaded(state) {
  return state['@machete-platform/core-bundle'] && state['@machete-platform/core-bundle'].Session && state['@machete-platform/core-bundle'].Session.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@machete-platform/core-bundle/Session/load')
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/@machete-platform/core-bundle/Session/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/@machete-platform/core-bundle/Session/logout')
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
