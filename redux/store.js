import {createStore, combineReducers, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {wisata} from "./reducers/wisata";
import {galeri} from "./reducers/galeri";

const reducers = combineReducers({
    wisata,
    galeri
});

const configureStore = (initialState = {}) => {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(reduxThunk)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(reducers, () => {
            const nextRootReducer = reducers;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore();
