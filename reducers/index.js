import { combineReducers } from 'redux';
import newPath from './newPath';

import paths from './paths';

export default combineReducers({
    form: newPath,
    paths
});
