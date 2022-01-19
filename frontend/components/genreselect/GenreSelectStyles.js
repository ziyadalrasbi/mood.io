import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    selectText: {
        fontFamily: 'InconsolataBold',
        fontSize: 13,
    },
    selectButton: {
        backgroundColor: '#4494da',
        marginHorizontal: 70,
        marginBottom: -20,
    },
    clearButton: {
        backgroundColor: 'red',
        minWidth: 90,
        marginRight: 50
    },
    continueButton: {
        backgroundColor: 'purple'
    }
});