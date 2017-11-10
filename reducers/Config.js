import config from '../../../../config';

const LOAD = '@vitruvian-tech/app-studio-core/Config/LOAD';
const LOAD_SUCCESS = '@vitruvian-tech/app-studio-core/Config/LOAD_SUCCESS';
const LOAD_FAIL = '@vitruvian-tech/app-studio-core/Config/LOAD_FAIL';

export default function reducer(state = config, action = {}) {
  switch (action.type) {
    case LOAD:
      return state;
    case LOAD_SUCCESS:
      return {
        ...action.result,
        error: null,
      };
    case LOAD_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@vitruvian-tech/app-studio-core/Config/load')
  };
}
