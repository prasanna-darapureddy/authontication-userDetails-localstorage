import { Box, Button, Paper, TextField, Typography, } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styles } from './LoginStyles';
import { useNavigate } from 'react-router-dom';

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

function Login() {
  const storedData = JSON.parse(localStorage.getItem('usersData') || '[]')
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email or contact')
      .required('Email or Contact is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existedUser = storedData.find((user: localStorageData['usersData']) =>
        user.email === values.email || user.contact === values.email);

      if (!existedUser) {
        alert('You are not registered with us, Please register')
        return navigate('/register')
      } else {
        if (existedUser.password !== values.password) {
          return alert('Incorrect Password')
        } else {
          localStorage.setItem('user', JSON.stringify({ ...storedUser, ...existedUser }))
          return navigate('/')
        }
      }
    },
  });

  return (
    <Box sx={styles.bgContainer}>
      <Box component={'img'} src={'/login.jpg'} alt='login' sx={styles.img} />
      <Paper component={'form'} onSubmit={formik.handleSubmit} sx={styles.loginFormContainer}>
        <Typography variant='h3' sx={styles.loginHeading}>Login</Typography>
        <TextField
          id="email"
          name="email"
          label="Email or Contact"
          variant="outlined"
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={styles.userInput}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          id="password"
          name="password"
          label="Password"
          type="password"
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={styles.userInput}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button color="primary" variant="contained" type="submit" sx={styles.loginButton}>
          Login
        </Button>
      </Paper>
    </Box>
  )
}
export default Login