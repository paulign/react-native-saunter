import {
  ADD_NEW_PATH,
  ADD_NEW_PATH_SUCCESS,
  ADD_NEW_PATH_ERROR,
  EDIT_PATH,
  EDIT_PATH_SUCCESS,
  EDIT_PATH_ERROR,
  REMOVE_PATH,
  REMOVE_PATH_SUCCESS,
  REMOVE_PATH_ERROR,
  ON_LOAD_ALL_PATHS,
  FILTER_PATHS_LIST
} from '../actions/types';

const INITIAL_STATE = {
  isSubmitting: false,
  isUpdating: false,
  pathsList: [],
  filterQuery: '',
  filteredList: null,
  filterQuery: ''
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
    case ON_LOAD_ALL_PATHS:
      return {
        ...state,
        pathsList: action.payload
      }
    case FILTER_PATHS_LIST:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
