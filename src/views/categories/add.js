import * as React from 'react';
import { useDispatch, useSelector } from 'store';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { addCategory } from 'store/slices/category';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// yup validation-schema
const validationSchema = yup.object({
    name: yup.string().required('Category name is Required')
});

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const CategoryAdd = ({ open, handleCloseDialog }) => {
    const [data, setData] = React.useState({});
    const dispatch = useDispatch();
    const { selectedBrand } = useSelector((state) => state.brands);

    React.useEffect(() => {
        if (selectedBrand) setData(selectedBrand);
        else setData(null);
    }, [selectedBrand]);

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema,
        onSubmit: (values) => {
            handleCloseDialog();
            dispatch(addCategory(values));
        }
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(1)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        maxHeight: '100%'
                    }
                }
            }}
        >
            {open && (
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add Brand</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    fullWidth
                                    label="Enter Brand Name*"
                                    defaultValue=""
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained" type="submit">
                                {selectedBrand ? 'Update' : 'Create'}
                            </Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

CategoryAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default CategoryAdd;
