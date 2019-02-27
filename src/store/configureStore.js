import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import exampleReducer from './reducers/exampleReducer';
import uiReducer from "./reducers/ui";
import authReducer from './reducers/auth';

let composeEnhancers = compose;

if (__DEV__) {
    // For React Native Debugger
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = combineReducers({
    examples: exampleReducer,
    ui: uiReducer,
    auth: authReducer
});

const configureStore = () => {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
}

export default configureStore;