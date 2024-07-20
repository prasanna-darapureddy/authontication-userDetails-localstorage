export const styles = {
    bgContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight:'100vh',
        backgroundImage: 'url(/bg.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        gap:5
    },
    heading:{
        fontFamily:'Helvetica',
        color:'#fff',
        fontSize:{xs:'25px', sm:'30px', md:'35px'}
    },
    userContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:'30px',
        borderRadius:'10px',
        gap:2
    },
    profileImg:{
        height:'100px',
        width:'100px',
        borderRadius:'50px',
        border: '1px solid #c8c8c8',
    },
    name:{
        textTransform:'capitalize',
        fontSize:{xs:'28px', sm:'30px', md:'35px'}
    }
}