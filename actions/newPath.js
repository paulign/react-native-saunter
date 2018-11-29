import firebase from '../firebaseConfig';
import {
    ADD_MAP_MARKER,
    ADD_NEW_PATH,
    ADD_NEW_PATH_SUCCESS,
    ADD_NEW_PATH_ERROR
} from './types';
import { reset } from 'redux-form';
import { StackActions, NavigationActions } from "react-navigation";

export const addMapMarker = (payload) => {
    return { type: ADD_MAP_MARKER, payload }
}

export const createNewPath = (navigation) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_NEW_PATH });
        const path = getState().form.newPath.values;
        const ref = firebase.database().ref('walking_paths').push();
        const id = ref.key;
        path.id = id;

        await ref.set(path);

        dispatch({ type: ADD_NEW_PATH_SUCCESS });
        dispatch(reset('newPath'));

        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({
                    routeName: "Home"
                }),
                NavigationActions.navigate({
                    routeName: "PathDetails",
                    params: {
                        id
                    }
                })
            ]
        });
        navigation.dispatch(resetAction);
    } catch (error) {
        console.log(error);
        dispatch({ type: ADD_NEW_PATH_ERROR });
    }
}