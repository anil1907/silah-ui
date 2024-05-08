// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import brandReducer from './slices/brand';
import modelReducer from './slices/model';
import categoryReducer from './slices/category';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    brands: brandReducer,
    models: modelReducer,
    categories: categoryReducer
});

export default reducer;
