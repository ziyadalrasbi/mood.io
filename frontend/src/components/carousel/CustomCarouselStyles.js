import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.get() * value, value);
}

const ios = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        height: getRatio(520),
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 7
    },
    icon: {
        resizeMode: 'contain',
        position: 'relative',
        marginTop: getRatio(15),
        width: getRatio(45),
        height: getRatio(45),
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    welcome: {
        fontFamily: 'MontserratBold',
        color: '#191414',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: getRatio(18)
    },
    subWelcome: {
        padding: getRatio(10),
        fontFamily: 'MontserratMedium',
        color: 'grey',
        fontSize: getRatio(13),
        textAlign: 'center',
        alignSelf: 'center'
    },
    loginButton: {
        backgroundColor: '#454B1B',
        alignSelf: 'flex-start',
    },
    spotifyLogo: {
        width: getRatio(25),
        height: getRatio(25),
        resizeMode: 'contain',
        backgroundColor: 'transparent'
    },
    buttonContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: getRatio(35),
        padding: getRatio(10),
        justifyContent: 'center',
        backgroundColor: '#1DB954',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: getRatio(40),
        borderRadius: 5,
    },
    mainFont: {
        fontFamily: 'MontserratMedium',
        fontSize: getRatio(13),
        color: 'white'
    },
    signUpContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: getRatio(15)
    },
    signUp: {
        fontFamily: 'MontserratMedium',
        fontSize: 11,
        color: 'black'
    },
    signUpLink: {
        fontFamily: 'MontserratBold',
        fontSize: 11,
        color: 'black'
    },
    carouselItem: {
        backgroundColor: 'white',
        borderRadius: 5,
        alignSelf: 'center',
        height: getRatio(410),
        width: getRatio(300),
        padding: getRatio(15)
    },
    dotStyle: {
        width: getRatio(6),
        height: getRatio(6),
        borderRadius: 5,
        marginHorizontal: getRatio(6),
        backgroundColor: 'black'
    },
    inactiveDotStyle: {
        width: getRatio(5),
        height: getRatio(5),
        borderRadius: 5,
        marginHorizontal: getRatio(6),
        backgroundColor: 'grey'
    },
});

const android = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        height: height / 1.72307692,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 7
    },
    icon: {
        resizeMode: 'contain',
        position: 'relative',
        marginTop: height / 59.7333333,
        width: width / 9.2,
        height: width / 9.2,
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    welcome: {
        fontFamily: 'MontserratBold',
        color: '#191414',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: width / 23
    },
    subWelcome: {
        padding: width / 41.4,
        fontFamily: 'MontserratMedium',
        color: 'grey',
        fontSize: width / 31.8461538,
        textAlign: 'center',
        alignSelf: 'center'
    },
    loginButton: {
        backgroundColor: '#454B1B',
        alignSelf: 'flex-start',
    },
    spotifyLogo: {
        width: width / 18.56,
        height: width / 18.56,
        resizeMode: 'contain',
        backgroundColor: 'transparent'
    },
    buttonContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: height / 25.6,
        padding: height / 89.6,
        justifyContent: 'center',
        backgroundColor: '#1DB954',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: height / 22.4,
        borderRadius: 5,
    },
    mainFont: {
        fontFamily: 'MontserratMedium',
        fontSize: width / 31.8461538,
        color: 'white'
    },
    signUpContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: height/59.7333333
    },
    signUp: {
        fontFamily: 'MontserratMedium',
        fontSize: 11,
        color: 'black'
    },
    signUpLink: {
        fontFamily: 'MontserratBold',
        fontSize: 11,
        color: 'black'
    },
    carouselItem: {
        backgroundColor: 'white',
        borderRadius: 5,
        alignSelf: 'center',
        height: height/2,
        width: width / 1.38,
        padding: height / 59.7333333
    },
    dotStyle: {
        width: width / 69,
        height: width / 69,
        borderRadius: 5,
        marginHorizontal: width / 69,
        backgroundColor: 'black'
    },
    inactiveDotStyle: {
        width: width / 82.8,
        height: width / 82.8,
        borderRadius: 5,
        marginHorizontal: width / 69,
        backgroundColor: 'grey'
    },
});

export default Platform.OS == 'android' ? android : ios;