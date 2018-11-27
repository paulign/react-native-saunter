import firebase from '../firebaseConfig';
import { push } from 'connected-react-router';
import {
    EDIT_PATH,
    EDIT_PATH_SUCCESS,
    EDIT_PATH_ERROR,
    REMOVE_PATH,
    REMOVE_PATH_SUCCESS,
    REMOVE_PATH_ERROR
} from './types';

export const toggleFavoriteState = (path) => async (dispatch) => {
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
}

export const removePath = (path) => async dispatch => {
    try {
        dispatch({ type: REMOVE_PATH });

        if (path && path.id) {
            const ref = firebase.database().ref(`walking_paths/${path.id}`);
            await ref.remove();
            dispatch(push('/'));
        }
        dispatch({ type: REMOVE_PATH_SUCCESS });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_PATH_ERROR });

    }
}