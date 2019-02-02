import {createStore, combineReducers, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {wisataList} from "./reducers/wisataList";
import {wisataOpen} from "./reducers/wisataOpen";
import {user} from "./reducers/user";
import {filter} from "./reducers/filter";

const reducers = combineReducers({
    wisataList,
    wisataOpen,
    user,
    filter
});

const configureStore = (initialState = {}) => {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(reduxThunk)
    );
    return store;
};

export default configureStore();
