const LOAD = '@vitruvian-tech/app-studio-core/Config/LOAD';
const LOAD_SUCCESS = '@vitruvian-tech/app-studio-core/Config/LOAD_SUCCESS';
const LOAD_FAIL = '@vitruvian-tech/app-studio-core/Config/LOAD_FAIL';

export function components(bundle) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/@vitruvian-tech/app-studio-core/Config/components?bundle=${bundle}`)
        .then(components => ({ [bundle]: components }))
  };
}

export function layout() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/@vitruvian-tech/app-studio-core/Config/layout`)
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return Object.assign(state, action.result);
    case LOAD_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
}
