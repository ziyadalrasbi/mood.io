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
        width: width,
        paddingHorizontal: 10,
        marginTop: height / 16.2909091
    },
    hamburger: {
        width: width / 13.8,
        height: height / 22.4,
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
        fontSize: 15
    },
    close: {
        marginLeft: width / 41.4,
        width: 22,
        height: 22,
        backgroundColor: 'transparent',
    }
})