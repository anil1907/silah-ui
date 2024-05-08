// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    models: []
};

const slice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getModelsSuccess(state, action) {
            state.models = action.payload;
        },

        addModelSuccess(state, action) {
            state.models.push(action.payload);
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getModels(index, size) {
    return async () => {
        try {
            const response = await axios.get(`/Models?PageIndex=${index}&PageSize=${size}`);
            dispatch(slice.actions.getModelsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export const addModel = createAsyncThunk('models/addModel', async (modelData, { dispatch }) => {
    try {
        const response = await axios.post('/Models', modelData);
        dispatch(slice.actions.addModelSuccess(response.data));
        dispatch(openSnackbar({ message: 'Model added successfully', severity: 'success' }));
    } catch (error) {
        dispatch(slice.actions.hasError(error));
        dispatch(openSnackbar({ message: 'Failed to add brand', severity: 'error' }));
    }
});
