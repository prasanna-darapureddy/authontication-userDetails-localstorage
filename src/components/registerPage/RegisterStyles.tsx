export const styles = {
    bgContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'Roboto',
    },
    heading: {
        fontSize: { xs: '15px', sm: '18px', md: '20px', lg: '25px' },
    },
    contentContainer: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 3
    },
    img: {
        height: '70%',
        width: { xs: '90%', sm: '40%' },
    },
    registerCard: {
        width: { xs: '90%', md: '40%' },
        backgroundColor: '#badcf4',
    },
    registerContent: {
        padding: '40px',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: '5px', sm: '30px' },
        gap: 2,
        alignSelf: 'center',
    },
    userInput: {
        width: { xs: '100%', sm: '60%' },
        color: '#fff',
    },
    contactUserInput: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
        width: { xs: '100%', sm: '60%' },
        color: '#fff',
    },
    nameProfileContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2
    },
    profile: {
        borderRadius: '50px',
        height: '70px',
        width: '70px',
        cursor: 'pointer',
        border: '1px solid #24292e',
    },
    rButton: {
        alignSelf: 'flex-start',
        textTransform: 'capitalize',
        backgroundColor: '#3788e1',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    fileInput: {
        display: 'none',
    }
}
