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
        fontSize: getRatio(27),
        alignSelf: 'center'
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
        marginTop: getRatio(20),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(16)
    },
    headerSubText: {
        fontFamily: 'InconsolataMedium',
        paddingHorizontal: getRatio(10),
        fontSize: getRatio(14),
        marginTop: getRatio(10),
        color: '#dbdbdb'
    },
    uploadContainer: {
        alignItems: 'flex-start'
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    contactText: {
        paddingHorizontal: getRatio(10),
        marginTop: getRatio(20),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(15),
        textAlign: 'center',
        alignSelf: 'center'
    }
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
        padding: 10,
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
        fontSize: width / 15.3333333,
        alignSelf: 'center'
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
        marginTop: height / 44.8,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 25.875
    },
    headerSubText: {
        fontFamily: 'InconsolataMedium',
        paddingHorizontal: width / 41.4,
        fontSize: width / 29.5714286,
        marginTop: height / 89.6,
        color: '#dbdbdb'
    },
    uploadContainer: {
        alignItems: 'flex-start'
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    contactText: {
        paddingHorizontal: width / 41.4,
        marginTop: height / 44.8,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default width > 500 ? tablet : mobile;