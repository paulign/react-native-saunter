import { reducer as formReducer } from 'redux-form';
import { ADD_MAP_MARKER } from '../actions/types';

const newPath = formReducer.plugin({
    newPath: (state, action) => {
        switch (action.type) {
            case ADD_MAP_MARKER:
                return {
                    ...state,
                    values: {
                        ...state.values,
                        path: action.payload.path,
                        distance: action.payload.distance
                    }
                }
            default:
                return state
        }
    }
});

export default newPath;