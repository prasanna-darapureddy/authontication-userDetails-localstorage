import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styles } from './RegisterStyles'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IState {
    image: string;
    showPassword: boolean
}

interface localStorageData {
    usersData: {
        name: string;
        dob: string;
        image: string;
        contact: string;
        email: string;
        password: string;
    }
}

function Register() {
    const [image, setImage] = useState<IState['image']>('/profile.png')
    const [showPassword, setShowPassword] = useState<IState['showPassword']>(false)
    const navigate = useNavigate()
    const storedList = JSON.parse(localStorage.getItem('usersData') || '[]')

    const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url: File = (event.target.files as FileList)[0];
        url && setImage(URL.createObjectURL(url))
    };

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required')
            .min(6, 'Name should be at least 6 characters'),
        contact: yup
            .string()
            .required('Contact is required')
            .matches(/\d/, 'Contact must be digits only')
            .length(10, 'Contact must be 10 digits'),
        dob: yup
            .string()
            .required('Date of birth is required')
            .max(10, 'Invalid date of birth'),
        email: yup
            .string()
            .required('Email is required')
            .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/, 'Enter a valid email')
            .email('Enter a valid email'),
        password: yup
            .string()
            .required('Password is required')
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
            .min(8, 'Password should be of minimum 8 characters length')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            contact: '',
            dob: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        validate: (values) => {
            if (values.name.length > 0 && values.name.length < 6) {
                formik.touched.name = true;
            } else {
                formik.touched.name = false;
            }

            if (values.dob.length > 0 && (values.dob.length < 10 || values.dob.length > 10)) {
                formik.touched.dob = true;
            } else {
                formik.touched.dob = false;
            }

            if ((values.contact.length > 0 && values.contact.length < 10) || /^[a-z]/.test(values.contact)) {
                formik.touched.contact = true;
            } else {
                formik.touched.contact = false;
            }

            if (values.email.length > 0 && (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/.test(values.email))) {
                formik.touched.email = true;
            } else {
                formik.touched.email = false;
            }

            if (values.password.length > 0 && (!/(?=.*[a-z])(?=.*[A-Z])\w+/.test(values.password)
                || !/\d/.test(values.password) || !/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(values.password)
                || values.password.length < 8)) {
                formik.touched.password = true;
            } else {
                formik.touched.password = false;
            }
        },
        onSubmit: (values) => {
            const existedUser = storedList.find((user: localStorageData['usersData']) =>
                user.email === values.email || user.contact === values.contact);

            if (existedUser) {
                alert(`${values.email} Id is Registered with us, Go to login`)
            } else {
                localStorage.setItem('usersData', JSON.stringify([...storedList, { ...values, image }]))
                alert('Registered succesfully, Login here to your account')
                return navigate('/login')
            }
        },
    });

    return (
        <Box sx={styles.bgContainer}>
            <Box sx={styles.contentContainer}>
                <Box component={'img'} src={'/reg.jpg'} sx={styles.img} alt='Register' />
                <Paper sx={styles.registerCard}>
                    <Box sx={styles.registerContent}>
                        <Typography variant='h3' sx={styles.heading}>Register New User</Typography>
                        <Box component={'form'} sx={styles.formContainer} onSubmit={formik.handleSubmit}>
                            <Box sx={styles.nameProfileContainer}>
                                <TextField type='text' placeholder='Name'
                                    sx={styles.userInput}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    variant="outlined"
                                    id="name"
                                    name="name"
                                    label="Name"
                                />
                                <Box component={'label'} htmlFor='image'>
                                    <Box component={'img'} src={image} alt='profile' sx={styles.profile} />
                                </Box>
                                <Box sx={styles.fileInput} component={'input'} id='image'
                                    onChange={onChangeImage} type='file' accept="image/*"
                                />
                            </Box>
                            <TextField type='Date' placeholder='Date of Birth' sx={styles.userInput}
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.dob && Boolean(formik.errors.dob)}
                                helperText={formik.touched.dob && formik.errors.dob}
                                variant="outlined"
                                id="dob"
                                name="dob"
                            />
                            <TextField type='text' placeholder='Contact' sx={styles.contactUserInput}
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contact && Boolean(formik.errors.contact)}
                                helperText={formik.touched.contact && formik.errors.contact}
                                variant="outlined"
                                id="contact"
                                name="contact"
                                label="Contact"
                                inputProps={{ maxLength: 10, }}
                            />
                            <TextField type='text' placeholder='Email' sx={styles.userInput}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                variant="outlined"
                                id="eamil"
                                name="email"
                                label="Email"
                            />
                            <TextField placeholder='Password' sx={styles.userInput}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                variant="outlined"
                                id="password"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: formik.values.password.length > 0 ?
                                        (<InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>) : null
                                }}
                            />
                            <Button variant='contained' sx={styles.rButton} type={'submit'}>Register</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
export default Register
