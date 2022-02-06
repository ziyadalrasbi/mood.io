import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    optionText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 29.5714286,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    logOutText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 29.5714286,
        color: 'red',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    profilePicture: {
        width: width / 4.14,
        height: width / 4.14,
        marginTop: 80,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    firstHeader: {
        fontFamily: 'InconsolataMedium',
        color: 'white',
        fontSize: width / 27.6,
        padding: width / 41.4,
        marginBottom: 15,
        marginTop: height / 179.2,
    },
    firstContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        marginBottom: height / 40.84,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    drawerTouchable: {
        width: width / 1.47857143
    }
});

