import * as React from 'react';
import { useDispatch, useSelector } from 'store';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';

// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { addModel } from 'store/slices/model';
import { getBrands } from 'store/slices/brand';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// yup validation-schema
const validationSchema = yup.object({
    name: yup.string().required('Brand name is Required'),
    brandId: yup.string().required('Brand id is Required')
});

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const BrandAdd = ({ open, handleCloseDialog }) => {
    const dispatch = useDispatch();
    const { brands } = useSelector((state) => state.brands);
    const [currentBrands, setCurrentBrands] = React.useState([]);

    React.useEffect(() => {
        setCurrentBrands(brands?.items);
    }, [brands]);

    React.useEffect(() => {
        dispatch(getBrands(0, 500));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            brandId: ''
        },
        validationSchema,
        onSubmit: (values) => {
            handleCloseDialog();
            dispatch(addModel(values));
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
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="brand-id-select">Brand Id</InputLabel>
                                    <Select
                                        labelId="brand-id-select"
                                        id="brandId"
                                        name="brandId"
                                        value={formik.values.brandId}
                                        onChange={formik.handleChange}
                                        label="Brand Id"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {currentBrands?.map((x) => (
                                            <MenuItem key={x.id} value={x.id}>
                                                {x.name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {formik.errors.brandId && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {' '}
                                            {formik.errors.brandId}{' '}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained" type="submit">
                                Create
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

BrandAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default BrandAdd;
