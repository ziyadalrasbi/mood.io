import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
        padding: width / 41.4,
        fontFamily: 'MontserratBold',
        color: '#191414',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: width / 23
    },
    subWelcome: {
        padding: width / 41.4,
        fontFamily: 'InconsolataLight',
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
        width: width / 16.56,
        height: height / 35.84,
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
        fontFamily: 'InconsolataMedium',
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
        fontFamily: 'InconsolataMedium',
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
        height: height / 2.18536585,
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