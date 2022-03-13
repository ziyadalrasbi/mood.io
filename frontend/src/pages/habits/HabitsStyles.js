import { Platform, StyleSheet, PixelRatio } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.get() * value, value);
}

const tablet = StyleSheet.create({
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: getRatio(110),
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        marginLeft: getRatio(10),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(27)
    },
    subWelcome: {
        marginTop: getRatio(20),
        paddingHorizontal: getRatio(10),
        fontFamily: 'MontserratLight',
        color: 'white',
        fontSize: getRatio(18)
    },
    firstContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        marginBottom: getRatio(22),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getRatio(23),
        backgroundColor: 'transparent',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: getRatio(45),
        alignSelf: 'center'
    },
    selectButtonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectIcon: {
        padding: getRatio(5),
        width: getRatio(15),
        height: getRatio(15),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'grey'
    },
    selectText: {
        color: 'white',
        fontFamily: 'MontserratMedium',
        fontSize: getRatio(14),
        paddingHorizontal: getRatio(10)
    },
    habitName: {
        paddingHorizontal: getRatio(10),
        fontFamily: 'MontserratLight',
        color: 'white',
        fontSize: getRatio(14)
    },
    habitDescription: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(27)
    },
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
    habitContainer: {
        marginRight: 15,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 5,
        backgroundColor: '#045de9',
        minWidth: 160,
        height: 115,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1.0,
        elevation: 3
    },
    habitsScrollContainer: {
        marginHorizontal: getRatio(5),
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    opacityContainer: {
        borderRadius: 10,
        height: 35,
        justifyContent: 'center'
    },
    habitAnimation: {
        width: getRatio(40),
        height: getRatio(40),
        marginTop: -getRatio(3)
    },
    loading: {
        width: getRatio(40),
        height: getRatio(40)
    },
    noDataText: {
        marginTop: getRatio(5),
        fontFamily: 'MontserratBold',
        color: 'grey',
        fontSize: getRatio(13),
        marginHorizontal: getRatio(10),
        padding: getRatio(10),
    },
    learnText: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: 11,
        marginBottom: 10
    },
    learnLink: {
        fontFamily: 'MontserratBold',
        color: '#1DB954',
        fontSize: 11,
        marginBottom: 10
    },
    loadingLottie: {
        width: getRatio(40),
        height: getRatio(40)
    }
});

const mobile = StyleSheet.create({
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: height / 8.2,
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        marginLeft: width / 41.4,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 15.3333333
    },
    subWelcome: {
        marginTop: height / 44.8,
        paddingHorizontal: width / 41.4,
        fontFamily: 'MontserratLight',
        color: 'white',
        fontSize: width / 23
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
        borderRadius: 23,
        backgroundColor: 'transparent',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: height / 19.9111111,
        alignSelf: 'center'
    },
    selectButtonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectIcon: {
        padding: width / 82.8,
        width: width / 27.6,
        height: width / 27.6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'grey'
    },
    selectText: {
        color: 'white',
        fontFamily: 'MontserratMedium',
        fontSize: width / 29.5714286,
        paddingHorizontal: width / 41.4
    },
    secondContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        marginBottom: height / 35.84,
        width: '100%',
        justifyContent: 'flex-start',
    },
    habitName: {
        paddingHorizontal: width / 41.4,
        fontFamily: 'MontserratLight',
        color: 'white',
        fontSize: width / 29.5714286
    },
    habitDescription: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 15.3333333
    },
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        padding: width / 41.4,
        backgroundColor: '#0d324d'
    },
    mainFont: {
        fontFamily: 'MontserratMedium',
        fontSize: width / 25.875
    },
    tabView: {
        flex: 1,
        height: '100%',
        backgroundColor: '#09263b',
    },
    gradientContainer: {
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        flex: 1,
        position: 'absolute'
    },
    next: {
        width: width / 24.3529412,
        height: height / 52.7058824,
        marginLeft: -(width / 41.4),
        marginTop: height / 54.9693252
    },
    lottieView: {
        marginTop: height / 17.92,
        marginLeft: width / 15.9230769,
        width: width / 4.14,
        height: width / 4.14,
        alignSelf: 'center'
    },
    lottieViewTracks: {
        marginTop: height / 17.92,
        width: width / 4.14,
        height: width / 4.14,
        alignSelf: 'center'
    },
    habitContainer: {
        marginRight: width / 27.6,
        marginLeft: width / 82.8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 5,
        marginTop: height / 29.8666667,
        marginBottom: height / 179.2,
        backgroundColor: '#045de9',
        width: width / 2.5875,
        height: height / 7.79130435,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1.0,
        elevation: 3
    },
    habitsScrollContainer: {
        marginHorizontal: width / 82.8,
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    opacityContainer: {
        borderRadius: 10,
        height: height / 25.6,
        justifyContent: 'center'
    },
    habitAnimation: {
        width: width / 10.35,
        height: width / 10.35,
        marginTop: -(height / 298.666667)
    },
    loading: {
        width: width / 10.35,
        height: width / 10.35
    },
    noDataText: {
        marginTop: height / 179.2,
        fontFamily: 'MontserratBold',
        color: 'grey',
        fontSize: width / 31.8461538,
        marginHorizontal: width / 41.4,
        padding: width / 41.4
    },
    learnText: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 37.6363636,
        marginBottom: height / 89.6
    },
    learnLink: {
        fontFamily: 'MontserratBold',
        color: '#1DB954',
        fontSize: width / 37.6363636,
        marginBottom: height / 89.6
    },
    loadingLottie: {
        width: width / 10.35,
        height: width / 10.35
    }
});

export default width > 500 ? tablet : mobile;

