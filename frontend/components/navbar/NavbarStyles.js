import { StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 10,
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
        height: height / 22.4,
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
        width: width / 18.8181818,
        height: width / 18.8181818,
        backgroundColor: 'transparent',
    },
    back: {
        width: width / 11.8285714,
        height: width / 11.8285714,
        backgroundColor: 'transparent',
    }
})