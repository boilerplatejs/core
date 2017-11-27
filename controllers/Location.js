const UPDATE = '@machete-platform/core-bundle/Location/UPDATE';
const UPDATE_SUCCESS = '@machete-platform/core-bundle/Location/UPDATE_SUCCESS';
const UPDATE_FAIL = '@machete-platform/core-bundle/Location/UPDATE_FAIL';

const initialState = {
  location: '',
  params: {}
};

export function update(state) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: () => Promise.resolve(state)
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE:
      return state;
    case UPDATE_SUCCESS:
      return {
        ...action.result,
        error: null,
      };
    case UPDATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
}
