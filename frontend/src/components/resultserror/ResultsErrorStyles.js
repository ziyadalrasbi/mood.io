import { PixelRatio, Platform, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.get() * value, value);
}

const tablet = StyleSheet.create({
    welcome: {
        marginLeft: getRatio(32),
        fontFamily: 'MontserratBold',
        color: 'red',
        fontSize: getRatio(14)
    },
    subWelcome: {
        marginLeft: getRatio(10),
        fontFamily: 'MontserratMedium',
        color: 'black',
        fontSize: getRatio(12)
    },
    button: {
        backgroundColor: '#2b5876',
        borderRadius: 5,
        marginRight: getRatio(10),
        marginBottom: getRatio(10)
    },
    buttonLabel: {
        fontFamily: 'MontserratBold',
        color: 'white'
    },
    gradientContainer: {
        height: height,
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute'
    },
});

const mobile = StyleSheet.create({
    welcome: {
        marginLeft: width / 12.9375,
        fontFamily: 'MontserratBold',
        color: 'red',
        fontSize: width / 29.5714286
    },
    subWelcome: {
        marginLeft: width / 41.4,
        fontFamily: 'MontserratMedium',
        color: 'black',
        fontSize: width / 34.5
    },
    button: {
        backgroundColor: '#2b5876',
        borderRadius: 5,
        marginRight: width / 41.4,
        marginBottom: width / 41.4
    },
    buttonLabel: {
        fontFamily: 'MontserratBold',
        color: 'white'
    },
    gradientContainer: {
        height: height,
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute'
    },
});

export default width > 500 ? tablet : mobile;

