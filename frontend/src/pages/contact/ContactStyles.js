import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.get() * value, value);
}

const tablet = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        padding: 10,
        backgroundColor: '#0d324d'
    },
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: getRatio(87),
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(27)
    },
    subWelcome: {
        marginTop: getRatio(29),
        fontFamily: 'MontserratLight',
        color: 'white',
        textAlign: 'center',
        fontSize: getRatio(16.56)
    },
    headerText: {
        marginLeft: getRatio(10),
        marginTop: getRatio(29),
        maxWidth: getRatio(340),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(16)
    },
    headerSubText: {
        fontFamily: 'MontserratMedium',
        maxWidth: getRatio(260),
        marginRight: getRatio(20),
        fontSize: getRatio(14),
        paddingVertical: getRatio(10),
        color: '#dbdbdb'
    },
    uploadContainer: {
        alignItems: 'flex-start'
    },
    lottie: {
        alignSelf: 'center',
        width: getRatio(200),
        height: getRatio(200)
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    submitButton: {
        width: getRatio(100),
        alignSelf: 'center',
        backgroundColor: '#2b5876'
    },
    submitText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(12)
    },
    label: {
        color: 'white',
        margin: getRatio(20),
        marginLeft: 0,
    },
    button: {
        marginTop: getRatio(40),
        color: 'white',
        height:  getRatio(40),
        backgroundColor: '#ec5990',
        borderRadius:  getRatio(4),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop:  getRatio(10),
        padding:  getRatio(8),
        backgroundColor: '#0e101c',
    },
    input: {
        backgroundColor: '#09263b',
        borderWidth: 1,
        borderColor: 'grey',
        padding:  getRatio(10),
        color: 'white',
        fontFamily: 'MontserratBold',
        width: '100%',
        marginTop:  getRatio(20)
    },
    messageBox: {
        backgroundColor: '#09263b',
        borderWidth: 1,
        borderColor: 'grey',
        padding:  getRatio(10),
        color: 'white',
        fontFamily: 'MontserratBold',
        width: '100%',
        height:  getRatio(200),
        marginTop:  getRatio(20)
    },
    error: {
        color: 'red',
        fontFamily: 'MontserratBold',
        marginTop:  getRatio(10)
    },
    loading: {
        width: getRatio(60), 
        height: getRatio(60), 
        alignSelf:'center'
    }
});

const mobile = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        padding: width / 41.4,
        backgroundColor: '#0d324d'
    },
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: height / 10.2988506,
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 15.3333333
    },
    subWelcome: {
        marginTop: height / 30.8965517,
        fontFamily: 'MontserratLight',
        color: 'white',
        textAlign: 'center',
        fontSize: width / 25
    },
    headerText: {
        marginLeft: width / 41.4,
        marginTop: height / 30.8965517,
        maxWidth: width / 1.21764706,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 25.875
    },
    headerSubText: {
        fontFamily: 'MontserratMedium',
        maxWidth: width / 1.59230769,
        marginRight: width / 20.7,
        fontSize: width / 29.5714286,
        paddingVertical: width / 41.4,
        color: '#dbdbdb'
    },
    uploadContainer: {
        alignItems: 'flex-start'
    },
    lottie: {
        alignSelf: 'center',
        width: width / 2.07,
        height: width / 2.07
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    submitButton: {
        width: 100,
        alignSelf: 'center',
        backgroundColor: '#2b5876'
    },
    submitText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 34.5
    },
    label: {
        color: 'white',
        margin: width / 20.7,
        marginLeft: 0,
    },
    button: {
        marginTop: height / 22.4,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: height / 89.6,
        padding: width / 51.75,
        backgroundColor: '#0e101c',
    },
    input: {
        backgroundColor: '#09263b',
        borderWidth: 1,
        borderColor: 'grey',
        padding: width / 41.4,
        color: 'white',
        fontFamily: 'MontserratBold',
        width: '100%',
        marginTop: height / 44.8
    },
    messageBox: {
        backgroundColor: '#09263b',
        borderWidth: 1,
        borderColor: 'grey',
        padding: width / 41.4,
        color: 'white',
        fontFamily: 'MontserratBold',
        width: '100%',
        height: height / 4.48,
        marginTop: height / 44.8
    },
    error: {
        color: 'red',
        fontFamily: 'MontserratBold',
        marginTop: height / 89.6
    },
    loading: {
        width: width/6.9, 
        height: width/6.9, 
        alignSelf:'center'
    }
});

export default width > 500 ? tablet : mobile;