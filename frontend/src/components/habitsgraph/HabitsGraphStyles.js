import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        justifyContent: 'flex-start',
    },
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    mainFont: {
        fontFamily: 'InconsolataMedium',
        fontSize: 22
    },
    scroll: {
        flex: 1,
        height: '100%'
    }
});