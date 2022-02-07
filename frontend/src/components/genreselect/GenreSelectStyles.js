import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    selectText: {
        fontFamily: 'InconsolataBold',
        fontSize: width / 31.8461538,
    },
    selectButton: {
        backgroundColor: '#4494da',
        marginHorizontal: width / 5.91428571,
        marginBottom: -(height / 44.8),
    },
    clearButton: {
        backgroundColor: 'red',
        minWidth: width / 4.6,
        marginRight: width / 8.28
    },
    continueButton: {
        backgroundColor: 'purple'
    },
    artistText: {
        fontFamily: 'InconsolataBold',
        fontSize: width / 31.8461538,
        maxWidth: width / 2.26229508,
        textAlign: 'left',
        marginLeft: width / 82.8
    },
    removeArtistText: {
        fontFamily: 'InconsolataBold',
        fontSize: width / 31.8461538,
        maxWidth: width / 2.26229508,
        textAlign: 'left',
        paddingHorizontal: width / 82.8
    },
    artistImage: {
        width: width / 8.28,
        height: width / 8.28,
        borderRadius: 5
    },
    addImage: {
        width: width / 13.8,
        height: width / 13.8
    },
    removeImage: {
        width:23,
        height:23
    }
});