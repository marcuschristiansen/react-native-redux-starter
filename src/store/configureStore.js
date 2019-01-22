import { createStore, combineReducers } from 'redux';

import exampleReducer from './reducers/exampleReducer';

const rootReducer = combineReducers({
    examples: exampleReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;