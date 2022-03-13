import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.getFontScale() * value, value);
}

const tablet = StyleSheet.create({
    lottie: {
        width: getRatio(100),
        height: getRatio(100)
    },
    gradientContainer: {
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute'
    },
    mainContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    loadingContainer: {
        flexDirection: 'row',
        marginTop: getRatio(20)
    },
    loadingText: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(13),
        padding: getRatio(10),
        marginRight: -(getRatio(10)),
    },
    ellpsis: {
        color: 'white',
        fontSize: getRatio(13),
        marginTop: getRatio(10)
    },
    firstContainer: {
        alignItems: 'center'
    },
    logo: {
        width: getRatio(348),
        height: getRatio(348),
        position: 'relative'
    }
});

const mobile = StyleSheet.create({
    lottie: {
        width: width / 4.14,
        height: height / 8.96
    },
    gradientContainer: {
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute'
    },
    mainContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    loadingContainer: {
        flexDirection: 'row',
        marginTop: height / 44.8
    },
    loadingText: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 31.8461538,
        padding: width / 41.4,
        marginRight: -(width / 41.4),
    },
    ellpsis: {
        color: 'white',
        fontSize: width / 31.8461538,
        marginTop: height / 89.6
    },
    firstContainer: {
        alignItems: 'center'
    },
    logo: {
        width: width / 1.18965517,
        height: width / 1.18965517,
        position: 'relative'
    }
});

export default width > 500 ? tablet : mobile; 