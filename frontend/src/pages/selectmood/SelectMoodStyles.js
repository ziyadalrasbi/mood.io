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
        fontSize: getRatio(16.56)
    },
    moodContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    moodOption: {
        display: 'flex',
        backgroundColor: 'white',
        width: getRatio(120),
        height: getRatio(120),
        borderRadius: 10,
        marginBottom: getRatio(50),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    buttonContainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: getRatio(10)
    },
    uploadButton: {
        backgroundColor: '#159ea3',
        marginTop: 10
    },
    continueButton: {
        backgroundColor: '#461ad6',
    },
    moodText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14)
    },
    gradientContainer: {
        height: getRatio(320),
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute'
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    gradientContainer: {
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        flex: 1,
        position: 'absolute'
    },
    moodImg: {
        width: getRatio(60),
        height: getRatio(60),
        marginBottom: getRatio(10),
    },
    selectedMoodText: {
        fontFamily: 'InconsolataMedium',
        fontSize: getRatio(14),
        color: 'white'
    },
    selectedMood: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14),
        color: 'white'
    }
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
        marginBottom: height / 89.6,
        maxWidth: width / 1.01764706,
        fontFamily: 'InconsolataLight',
        color: 'white',
        fontSize: width / 25
    },
    moodContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    moodOption: {
        display: 'flex',
        backgroundColor: 'white',
        width: width / 3.45,
        height: width / 3.45,
        borderRadius: 10,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    buttonContainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: height / 89.6
    },
    uploadButton: {
        backgroundColor: '#159ea3',
        marginTop: 10
    },
    continueButton: {
        backgroundColor: '#461ad6',
    },
    moodText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 29.5714286
    },
    gradientContainer: {
        height: height / 2.8,
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute'
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    gradientContainer: {
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        flex: 1,
        position: 'absolute'
    },
    moodImg: {
        width: width / 6.9,
        height: width / 6.9,
        marginBottom: height / 89.6,
    },
    selectedMoodText: {
        fontFamily: 'InconsolataMedium',
        fontSize: width / 29.5714286,
        color: 'white'
    },
    selectedMood: {
        fontFamily: 'MontserratBold',
        fontSize: width / 29.5714286,
        color: 'white'
    }
});

export default Platform.OS == 'android' ? android : ios;