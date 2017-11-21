const NEXT = '@vitruvian-tech/app-studio-core/Transition/NEXT';
const NEXT_SUCCESS = '@vitruvian-tech/app-studio-core/Transition/NEXT_SUCCESS';
const NEXT_FAIL = '@vitruvian-tech/app-studio-core/Transition/NEXT_FAIL';

const PREVIOUS = '@vitruvian-tech/app-studio-core/Transition/PREVIOUS';
const PREVIOUS_SUCCESS = '@vitruvian-tech/app-studio-core/Transition/PREVIOUS_SUCCESS';
const PREVIOUS_FAIL = '@vitruvian-tech/app-studio-core/Transition/PREVIOUS_FAIL';

const TRANSITION = '@vitruvian-tech/app-studio-core/Transition/TRANSITION';
const TRANSITION_SUCCESS = '@vitruvian-tech/app-studio-core/Transition/TRANSITION_SUCCESS';
const TRANSITION_FAIL = '@vitruvian-tech/app-studio-core/Transition/TRANSITION_FAIL';

let index = {};

const initialState = {
  error: null
};

export function next(type) {
  return {
    types: [NEXT, NEXT_SUCCESS, NEXT_FAIL],
    promise: () => Promise.resolve({ [type]: (index[type] || 0) + 1 })
  };
}

export function previous(type) {
  return {
    types: [PREVIOUS, PREVIOUS_SUCCESS, PREVIOUS_FAIL],
    promise: () => Promise.resolve({ [type]: Math.max(0, (index[type] || 0) - 1) })
  };
}

export function transition(type, index) {
  return {
    types: [TRANSITION, TRANSITION_SUCCESS, TRANSITION_FAIL],
    promise: () => Promise.resolve({ [type]: index })
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NEXT:
      return state;
    case NEXT_SUCCESS:
      index = Object.assign(index, action.result);
      return {
        ...index,
        error: null,
      };
    case NEXT_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;

    case PREVIOUS:
      return state;
    case PREVIOUS_SUCCESS:
      index = Object.assign(index, action.result);
      return {
        ...index,
        error: null,
      };
    case PREVIOUS_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;

    case TRANSITION:
      return state;
    case TRANSITION_SUCCESS:
      index = Object.assign(index, action.result);
      return {
        ...index,
        error: null,
      };
    case TRANSITION_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;

    default:
      return state;
  }
}
