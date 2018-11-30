import firebase from "../firebaseConfig";
import {
  EDIT_PATH,
  EDIT_PATH_SUCCESS,
  EDIT_PATH_ERROR,
  REMOVE_PATH,
  REMOVE_PATH_SUCCESS,
  REMOVE_PATH_ERROR,
  ON_LOAD_ALL_PATHS,
  FILTER_PATHS_LIST
} from "./types";

export const toggleFavoriteState = path => async dispatch => {
  try {
    dispatch({ type: EDIT_PATH });
    if (path && path.id) {
      const ref = firebase.database().ref(`walking_paths/${path.id}`);
      const favorite = !path.favorite;
      await ref.update({ favorite });
      dispatch({ type: EDIT_PATH_SUCCESS });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: EDIT_PATH_ERROR });
  }
};

export const removePath = (path, navigation) => async dispatch => {
  try {
    dispatch({ type: REMOVE_PATH });

    if (path && path.id) {
      const ref = firebase.database().ref(`walking_paths/${path.id}`);
      await ref.remove();
    }
    dispatch({ type: REMOVE_PATH_SUCCESS });
    navigation.goBack();
  } catch (error) {
    console.log(error);
    dispatch({ type: REMOVE_PATH_ERROR });
  }
};

export const onLoadPaths = list => (dispatch, getState) => {
  const { filterQuery } = getState().paths;
  dispatch({ type: ON_LOAD_ALL_PATHS, payload: list });
  dispatch(onFilterList(filterQuery));
};

export const onFilterList = (filterQuery = "") => (dispatch, getState) => {
  const { pathsList } = getState().paths;
  let filteredList = filterQuery ? [] : null;
  if (pathsList.length && filterQuery) {
    filteredList = [].concat(pathsList).filter(path => {
      return (
        path.title.toLowerCase().search(filterQuery.toLowerCase()) !== -1 ||
        path.full_description
          .toLowerCase()
          .search(filterQuery.toLowerCase()) !== -1
      );
    });
  }
  dispatch({
    type: FILTER_PATHS_LIST,
    payload: {
      filteredList,
      filterQuery
    }
  });
};
