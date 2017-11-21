const CREATE = '@vitruvian-tech/app-studio-core/Contact/CREATE';
const CREATE_SUCCESS = '@vitruvian-tech/app-studio-core/Contact/CREATE_SUCCESS';
const CREATE_FAIL = '@vitruvian-tech/app-studio-core/Contact/CREATE_FAIL';

const VALIDATE = '@vitruvian-tech/app-studio-core/Contact/VALIDATE';
const VALIDATE_SUCCESS = '@vitruvian-tech/app-studio-core/Contact/VALIDATE_SUCCESS';
const VALIDATE_FAIL = '@vitruvian-tech/app-studio-core/Contact/VALIDATE_FAIL';

const UPDATE = '@vitruvian-tech/app-studio-core/Contact/UPDATE';
const UPDATE_SUCCESS = '@vitruvian-tech/app-studio-core/Contact/UPDATE_SUCCESS';
const UPDATE_FAIL = '@vitruvian-tech/app-studio-core/Contact/UPDATE_FAIL';

const initialState = {
  error: null
};

export function create(data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/@vitruvian-tech/app-studio-core/Contact/create', { data })
  };
}

export function update(data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/@vitruvian-tech/app-studio-core/Contact/update', { data })
  };
}

export function validate(data) {
  return {
    types: [VALIDATE, VALIDATE_SUCCESS, VALIDATE_FAIL],
    promise: (client) => client.post('/@vitruvian-tech/app-studio-core/Contact/validate', { data })
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE:
      return state;
    case CREATE_SUCCESS:
      return {
        ...state,
        ...action.result,
        error: null,
      };
    case CREATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    case VALIDATE:
      return state;
    case VALIDATE_SUCCESS:
      return {
        ...state,
        ...state.data,
        error: null,
      };
    case VALIDATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
}
