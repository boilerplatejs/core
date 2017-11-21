const LOAD = '@vitruvian-tech/app-studio-core/Auth/LOAD';
const LOAD_SUCCESS = '@vitruvian-tech/app-studio-core/Auth/LOAD_SUCCESS';
const LOAD_FAIL = '@vitruvian-tech/app-studio-core/Auth/LOAD_FAIL';

const LOGIN = '@vitruvian-tech/app-studio-core/Auth/LOGIN';
const LOGIN_SUCCESS = '@vitruvian-tech/app-studio-core/Auth/LOGIN_SUCCESS';
const LOGIN_FAIL = '@vitruvian-tech/app-studio-core/Auth/LOGIN_FAIL';

const LOGOUT = '@vitruvian-tech/app-studio-core/Auth/LOGOUT';
const LOGOUT_SUCCESS = '@vitruvian-tech/app-studio-core/Auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = '@vitruvian-tech/app-studio-core/Auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export function isLoaded(state) {
  return state['@vitruvian-tech/app-studio-core'] && state['@vitruvian-tech/app-studio-core'].Auth && state['@vitruvian-tech/app-studio-core'].Auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@vitruvian-tech/app-studio-core/Auth/load')
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/@vitruvian-tech/app-studio-core/Auth/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/@vitruvian-tech/app-studio-core/Auth/logout')
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
