import firebase from '../firebaseConfig';
import {
    ADD_MAP_MARKER,
    ADD_NEW_PATH,
    ADD_NEW_PATH_SUCCESS,
    ADD_NEW_PATH_ERROR
} from './types';
import { reset } from 'redux-form';

export const addMapMarker = (payload) => {
    return { type: ADD_MAP_MARKER, payload }
}

export const createNewPath = (onSuccess = () => {}) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_NEW_PATH });
        const path = getState().form.newPath.values;
        const ref = firebase.database().ref('walking_paths').push();
        const id = ref.key;
        path.id = id;

        await ref.set(path);

        dispatch({ type: ADD_NEW_PATH_SUCCESS });
        onSuccess();
        dispatch(reset('newPath'));
    } catch (error) {
        console.log(error);
        dispatch({ type: ADD_NEW_PATH_ERROR });
    }
}