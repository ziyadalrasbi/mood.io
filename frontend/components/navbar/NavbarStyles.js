import { StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
        position: 'absolute',
        marginLeft: width/41.4,
        marginTop: height/16.2909091
    },
    hamburger: {
        width: width/13.8,
        height: height/22.4,
        backgroundColor: 'transparent',
    },
    scan: {
        width:  width/13.8,
        height: height/22.4,
        backgroundColor: 'transparent',
        marginLeft: width/ 1.25454545
    }
})