import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function FormikPractice() {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, '*Name must be at least 6 characters')
      .max(20, '*Name is too long!')
      .required('*Name is required'),
    email: Yup.string()
      .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/, '*Enter a valid email with (@, .)')
      .email('*Invalid email')
      .required('*Email is required'),
    password: Yup.string()
      .min(8, '*Password must be at least 8 characters')
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "*Password should contain at least one uppercase and lowercase character")
      .matches(/\d/, "*Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "*Password should contain at least one special character")
      .required('*Password is required'),
  });

  const storedList = JSON.parse(localStorage.getItem('userList')!) ?? []

  return (
    <Stack direction='column' spacing={3} sx={styles.mainContainer}>
      <Typography variant='h2'>Sign In</Typography>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const existedUser = storedList.length > 0 &&
            storedList.find((eachUser: any) => eachUser?.email === values?.email);

          if (existedUser) {
            if (values.password === existedUser.password) {
              localStorage.setItem('user', JSON.stringify({ ...existedUser }))
              actions.resetForm();
              navigate('/Home')
            } else {
              actions.setErrors({ password: 'Incorrect password' });
            }
          } else {
            actions.setErrors({ email: 'Your not registered with us, please sign up first' });
          }
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, handleReset, values, errors, touched }) => (
          <Paper component={'form'} onSubmit={handleSubmit} onReset={handleReset} sx={styles.formContainer}>
            <TextField
              type="text"
              name="name"
              placeholder='Name'
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleBlur}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              type="text"
              name="email"
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleBlur}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              type="password"
              name="password"
              placeholder='Password'
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleBlur}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Box sx={styles.buttonsContainer}>
              <Button variant='contained' type="submit" sx={styles.buttons}>Submit</Button>
              <Button variant='contained' type="reset" sx={styles.buttons}>Reset</Button>
            </Box>
          </Paper>
        )}
      </Formik>
    </Stack>
  )
}
export default FormikPractice


const styles = {
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    gap: 3
  },
  buttonsContainer: {
    display: 'flex',
    gap: 3,
  },
  buttons: {
    textTransform: 'capitalize',
  }
}
