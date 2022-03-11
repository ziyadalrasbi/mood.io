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
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        padding: getRatio(10),
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
        maxWidth: getRatio(200),
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
        backgroundColor: '#348AC7'
    },
    selectMoodButton: {
        width: getRatio(100),
        alignSelf: 'center',
        backgroundColor: '#7474BF'
    },
    submitText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(12)
    },
});

const mobile = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        marginLeft: width / 41.4,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 15.3333333
    },
    subWelcome: {
        marginLeft: width / 41.4,
        marginTop: height / 30.8965517,
        fontFamily: 'InconsolataLight',
        color: 'white',
        fontSize: width / 25
    },
    headerText: {
        marginLeft: width / 41.4,
        marginTop: height / 30.8965517,
        maxWidth: getRatio(340),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 25.875
    },
    headerSubText: {
        fontFamily: 'InconsolataMedium',
        maxWidth: width / 2.07,
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
        width: width / 4.14,
        alignSelf: 'center',
        backgroundColor: '#348AC7'
    },
    selectMoodButton: {
        width: width / 4.14,
        alignSelf: 'center',
        backgroundColor: '#7474BF'
    },
    submitText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 34.5
    },
});

export default width > 500 ? tablet : mobile;