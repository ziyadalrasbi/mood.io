import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.get() * value, value);
}

const ios = StyleSheet.create({
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
        marginLeft: getRatio(10),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(27)
    },
    subWelcome: {
        marginLeft: getRatio(10),
        marginTop: getRatio(29),
        fontFamily: 'InconsolataLight',
        color: 'white',
        textAlign:'center',
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
        fontFamily: 'InconsolataMedium',
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
});

const android = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        height: height / 10.2,
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        marginLeft: width / 41.4,
        fontFamily: 'MontserratBold',

        color: 'white',
        fontSize: width / 15.56
    },
    subWelcome: {
        marginLeft: width / 41.4,
        marginTop: height / 30.89230769,
        maxWidth: width / 1.01764706,
        fontFamily: 'InconsolataLight',
        textAlign:'center',
        color: 'white',
        fontSize: width / 25
    },
    headerText: {
        marginLeft: width / 41.4,
        marginTop: height / 30.89230769,
        maxWidth: width / 1.21764706,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 26
    },
    headerSubText: {
        fontFamily: 'InconsolataMedium',
        width: width / 1.88181818,
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
});

export default Platform.OS == 'android' ? android : ios;