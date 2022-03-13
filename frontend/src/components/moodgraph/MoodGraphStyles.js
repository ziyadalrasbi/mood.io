import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        marginBottom: 25,
        marginLeft:12,
        width: '100%',
        justifyContent: 'flex-start',
    },
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        width: '80%',
        justifyContent: 'center',
        flexDirection:'row',
        backgroundColor: 'transparent',
    },
    mainFont: {
        fontFamily: 'MontserratMedium',
        fontSize: 22
    },
    scroll: {
        flex: 1,
        height: '100%'
    }
});