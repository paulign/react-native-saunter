import {
  ADD_NEW_PATH,
  ADD_NEW_PATH_SUCCESS,
  ADD_NEW_PATH_ERROR,
  EDIT_PATH,
  EDIT_PATH_SUCCESS,
  EDIT_PATH_ERROR,
  REMOVE_PATH,
  REMOVE_PATH_SUCCESS,
  REMOVE_PATH_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  isSubmitting: false,
  isUpdating: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_PATH:
      return {
        ...state,
        isSubmitting: true
      }
    case ADD_NEW_PATH_ERROR:
    case ADD_NEW_PATH_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    case EDIT_PATH:
    case REMOVE_PATH:
      return {
        ...state,
        isUpdating: true
      }
    case EDIT_PATH_ERROR:
    case EDIT_PATH_SUCCESS:
    case REMOVE_PATH_SUCCESS:
    case REMOVE_PATH_ERROR:
      return {
        ...state,
        isUpdating: false
      }
    default:
      return state;
  }
};
