import { Box, Card, Typography } from '@mui/material'
import { styles } from './HomeStyles'

function UserHome() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <Box sx={styles.bgContainer}>
      <Typography variant='h2' sx={styles.heading}>User Details</Typography>
      <Card sx={styles.userContainer}>
        <Box component={'img'} src={userData.image} alt='profile' sx={styles.profileImg} />
        <Typography variant='h3' sx={styles.name}>Name: {userData.name}</Typography>
        <Typography>Date of Birth: {userData.dob}</Typography>
        <Typography>Email: {userData.email}</Typography>
        <Typography>Contact: {userData.contact}</Typography>
      </Card>
    </Box>
  )
}

export default UserHome
