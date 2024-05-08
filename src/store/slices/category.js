// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    categories: [],
    selectedCategory: null
};

const slice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getCategoriesSuccess(state, action) {
            state.categories = action.payload;
        },

        addCategorySuccess(state, action) {
            state.categories.items.push(action.payload);
        },

        setCategorySuccess(state, action) {
            state.selectedCategory = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategories(index, size) {
    return async () => {
        try {
            const response = await axios.get(`/categories?PageIndex=${index}&PageSize=${size}`);
            dispatch(slice.actions.getCategoriesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export const addCategory = createAsyncThunk('categories/addCategory', async (data, { dispatch }) => {
    try {
        const response = await axios.post('/categories', data);
        dispatch(slice.actions.addCategorySuccess(response.data));
        dispatch(openSnackbar({ message: 'category added successfully', severity: 'success' }));
    } catch (error) {
        dispatch(slice.actions.hasError(error));
        dispatch(openSnackbar({ message: 'Failed to add category', severity: 'error' }));
    }
});

export function selectedCategory(data) {
    return async () => {
        dispatch(slice.actions.setCategorySuccess(data));
    };
}
