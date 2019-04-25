const LOAD = '@machete-platform/core-bundle/Config/LOAD';
const LOAD_SUCCESS = '@machete-platform/core-bundle/Config/LOAD_SUCCESS';
const LOAD_FAIL = '@machete-platform/core-bundle/Config/LOAD_FAIL';

export function components(bundle) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/@machete-platform/core-bundle/Config/components?bundle=${bundle}`)
        .then(components => ({ [bundle]: components }))
  };
}

export function layout() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/@machete-platform/core-bundle/Config/layout`)
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
