import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.get() * value, value);
}

const ios = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        paddingHorizontal: getRatio(10),
        marginTop: getRatio(55)
    },
    hamburger: {
        width: getRatio(30),
        height: getRatio(30),
        backgroundColor: 'transparent',
    },
    about: {
        width: getRatio(30),
        height: getRatio(30),
        backgroundColor: 'transparent',
    },
    scan: {
        width: getRatio(30),
        height: getRatio(30),
        backgroundColor: 'transparent',
    },
    welcome: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(15),
        maxWidth: width / 1.27384615,
        textAlign: 'center'
    },
    close: {
        marginLeft: getRatio(10),
        marginTop: getRatio(5),
        width: getRatio(22),
        height: getRatio(22),
        backgroundColor: 'transparent',
    },
    back: {
        width: getRatio(35),
        height: getRatio(35),
        backgroundColor: 'transparent',
    }
})

const android = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        paddingHorizontal: height/89.6,
        marginTop: height / 16.2909091
    },
    hamburger: {
        width: width / 13.8,
        height: width / 13.8,
        backgroundColor: 'transparent',
    },
    about: {
        width: width / 13.8,
        height: width / 13.8,
        backgroundColor: 'transparent',
    },
    scan: {
        width: width / 13.8,
        height: width / 13.8,
        backgroundColor: 'transparent',
    },
    welcome: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        maxWidth: width / 1.27384615,
        textAlign: 'center'
    },
    close: {
        marginLeft: width / 41.4,
        marginTop: height / 179.2,
        width: width / 20.8181818,
        height: width / 20.8181818,
        backgroundColor: 'transparent',
    },
    back: {
        width: width / 14,
        height: width / 14,
        backgroundColor: 'transparent',
    }
})

export default Platform.OS == 'android' ? android : ios; 