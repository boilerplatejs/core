const UPDATE = '@machete-platform/core-bundle/Router/UPDATE';
const UPDATE_SUCCESS = '@machete-platform/core-bundle/Router/UPDATE_SUCCESS';
const UPDATE_FAIL = '@machete-platform/core-bundle/Router/UPDATE_FAIL';

const initialState = {
  location: {},
  params: {},
  error: null
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
      return { ...action.result, error: null };
    case UPDATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
}
