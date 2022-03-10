import { StyleSheet, PixelRatio } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.getFontScale() * value, value);
}

export default StyleSheet.create({
    optionText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14),
        color: 'white',
        paddingHorizontal: getRatio(10),
        paddingVertical: getRatio(20)
    },
    logOutText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14),
        color: 'red',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    confirmDeleteHeader: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14),
        color: 'red',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    confirmDelete: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14),
        color: 'red',
        paddingHorizontal: 10,

    },
    cancel: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14),
        color: 'white',
        paddingHorizontal: 10,
 
    },
    profilePicture: {
        width: getRatio(100),
        height: getRatio(100),
        marginTop: getRatio(80),
        borderRadius: getRatio(100),
        borderWidth: 1,
        borderColor: 'white'
    },
    firstHeader: {
        fontFamily: 'InconsolataMedium',
        color: 'white',
        fontSize: getRatio(15),
        padding: getRatio(10),
        marginBottom: getRatio(15),
        marginTop: getRatio(5),
    },
    firstContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    drawerTouchable: {
        width: getRatio(280)
    },
    drawerContainer: {
        alignItems: 'flex-start',
    }
});

