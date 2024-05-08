// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    brands: [],
    selectedBrand: null
};

const slice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getBrandsSuccess(state, action) {
            state.brands = action.payload;
        },

        addBrandSuccess(state, action) {
            state.brands.push(action.payload);
        },

        setBrandSuccess(state, action) {
            state.selectedBrand = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBrands(index, size) {
    return async () => {
        try {
            const response = await axios.get(`/Brands?PageIndex=${index}&PageSize=${size}`);
            dispatch(slice.actions.getBrandsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export const addBrand = createAsyncThunk('brands/addBrand', async (brandData, { dispatch }) => {
    try {
        const response = await axios.post('/Brands', brandData);
        dispatch(slice.actions.addBrandSuccess(response.data));
        dispatch(openSnackbar({ message: 'Brand added successfully', severity: 'success' }));
    } catch (error) {
        dispatch(slice.actions.hasError(error));
        dispatch(openSnackbar({ message: 'Failed to add brand', severity: 'error' }));
    }
});

export function selectedBrand(data) {
    return async () => {
        dispatch(slice.actions.setBrandSuccess(data));
    };
}
