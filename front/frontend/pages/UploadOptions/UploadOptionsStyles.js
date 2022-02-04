import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        padding: 10,
        backgroundColor: '#0d324d'
    },
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: height / 10.2,
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        marginLeft: width / 41.4,
        fontFamily: 'MontserratBold',

        color: 'white',
        fontSize: width / 15.56
    },
    subWelcome: {
        marginLeft: width / 41.4,
        marginTop: height / 30.89230769,
        maxWidth: width / 1.01764706,
        fontFamily: 'InconsolataLight',
        color: 'white',
        fontSize: width / 25
    },
    headerText: {
        marginLeft: width / 41.4,
        marginTop: height / 30.89230769,
        maxWidth: width / 1.21764706,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 26
    },
    headerSubText: {
        fontFamily: 'InconsolataMedium',
        width: width / 1.88181818,
        marginRight: width / 20.7,
        fontSize: width / 29.5714286,
        paddingVertical: width / 41.4,
        color: '#dbdbdb'
    },
    uploadContainer: {
        alignItems: 'flex-start'
    },
    lottie: {
        alignSelf: 'center',
        width: width / 2.07,
        height: width / 2.07
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
});

