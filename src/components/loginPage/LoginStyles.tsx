export const styles = {
    bgContainer:{
        display: 'flex',
        flexDirection: {xs:'column', sm:'row'},
        alignItems: 'center',
        minHeight:'100vh',
    },
    img:{
        height:'100%',
        width:{xs:'100%', sm:'50%'},
    },
    loginFormContainer:{
        width:{xs:'60%', sm:'40%'},
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap:4,
        padding:'40px',
    },
    loginHeading:{
        alignSelf:'center',
    },
    userInput:{
        width:{xs:'100%', sm:'60%'},
    },
    loginButton:{
        textTransform:'capitalize',
        backgroundColor:'#3788e1',
    }
}