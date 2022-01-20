import { StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
        position: 'absolute',
        marginLeft: 10,
        marginTop: 55
    },
    hamburger: {
        width: 30,
        height: 40,
        backgroundColor: 'transparent',
    },
    scan: {
        width: 30,
        height: 40,
        backgroundColor: 'transparent',
        marginLeft: width/ 1.25454545
    }
})