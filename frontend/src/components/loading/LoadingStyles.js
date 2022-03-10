import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
        width: 348,
        height: 348
    }
});