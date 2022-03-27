import { StyleSheet } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
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
        height: getRatio(109.268293),
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        marginLeft:getRatio(10),
        fontFamily: 'MontserratBold',
        marginTop: getRatio(130),
        color: 'white',
        fontSize: getRatio(25)
    },
    subWelcome: {
        padding: getRatio(10),
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
        borderRadius: 23,
        backgroundColor: 'transparent',
    },
    recommendationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        paddingVertical: getRatio(10)
    },
    firstHeader: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(15),
        paddingHorizontal: getRatio(10),
        paddingVertical: 5
    },
    firstSubHeader: {
        fontFamily: 'MontserratMedium',
        fontSize: getRatio(14),
        paddingHorizontal: getRatio(10),
        paddingVertical: 5,
        color: '#dbdbdb'
    },
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        marginBottom: -(getRatio(300))
    },
    topTracksContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#0d324d'
    },
    trackContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#141E30',
        padding: getRatio(10),
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTrackText: {
        fontFamily: 'MontserratMedium',
        color: 'white',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginTop: getRatio(8),
        marginBottom: getRatio(5),
        fontSize: getRatio(12),
        
        maxWidth: getRatio(280),
        marginRight: getRatio(20)
    },
    topTrackTextContainer: {
        alignSelf: 'center'
    },
    topTrackArtistText: {
        fontFamily: 'MontserratMedium',
        color: '#dbdbdb',
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: getRatio(12),
        
        marginRight: getRatio(20),
        maxWidth: getRatio(280)
    },
    topTrackImage: {
        width: getRatio(60),
        height: getRatio(60),
        marginRight: getRatio(20),
        marginTop: getRatio(10),
        borderRadius: 5
    },
    playImage: {
        width: getRatio(22),
        height: getRatio(22)
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    tabView: {
        flex: 1,
        height: '100%',
        backgroundColor: '#09263b',
    },
    noDataText: {
        marginTop: getRatio(5),
        fontFamily: 'MontserratBold',
        color: 'grey',
        fontSize: getRatio(13),
        marginRight: getRatio(10),
        padding: getRatio(10),
        maxWidth: getRatio(390),
    },
    lottieView: {
        width: getRatio(60),
        height: getRatio(60),
        marginRight: getRatio(5),
        alignSelf: 'center'
    },
    openSpotify: {
        backgroundColor: '#088F8F',
        borderRadius: 5,
        marginRight: 5
    },
    saveToSpotify: {
        borderRadius: 5,
        marginRight: getRatio(5)
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
        marginTop: height / 6.89230769,
        color: 'white',
        fontSize: width / 16.56
    },
    subWelcome: {
        padding: width / 41.4,
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
    recommendationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        paddingVertical: height / 89.6
    },
    firstHeader: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        paddingHorizontal: width / 41.4,
        paddingVertical: 5
    },
    firstSubHeader: {
        fontFamily: 'MontserratMedium',
        fontSize: width / 29.5714286,
        paddingHorizontal: width / 41.4,
        paddingVertical: 5,
        color: '#dbdbdb'
    },
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        marginBottom: -(height / 2.98666667)
    },
    topTracksContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#0d324d'
    },
    trackContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#141E30',
        padding: width / 41.4,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTrackText: {
        fontFamily: 'MontserratMedium',
        color: 'white',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginTop: height / 112,
        marginBottom: height / 179.2,
        fontSize: width / 34.5,
        
        maxWidth: width / 1.47857143,
        marginRight: width / 20.7
    },
    topTrackTextContainer: {
        alignSelf: 'center'
    },
    topTrackArtistText: {
        fontFamily: 'MontserratMedium',
        color: '#dbdbdb',
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: width / 34.5,
        
        marginRight: width / 20.7,
        maxWidth: width / 1.47857143
    },
    topTrackImage: {
        width: width / 6.9,
        height: width / 6.9,
        marginRight: width / 20.7,
        marginTop: height / 89.6,
        borderRadius: 5
    },
    playImage: {
        width: width / 18.8181818,
        height: width / 18.8181818
    },
    scroll: {
        flex: 1,
        height: '100%',
        backgroundColor: '#0d324d'
    },
    tabView: {
        flex: 1,
        height: '100%',
        backgroundColor: '#09263b',
    },
    noDataText: {
        marginTop: height / 179.2,
        fontFamily: 'MontserratBold',
        color: 'grey',
        fontSize: width / 31.8461538,
        marginRight: width / 41.4,
        padding: width / 41.4,
        maxWidth: width / 1.06153846,
    },
    lottieView: {
        width: width / 6.9,
        height: width / 6.9,
        marginRight: width / 82.8,
        alignSelf: 'center'
    },
    openSpotify: {
        backgroundColor: '#088F8F',
        borderRadius: 5,
        marginRight: 5
    },
    saveToSpotify: {
        borderRadius: 5,
        marginRight: width / 82.8
    }
});

export default width > 500 ? tablet : mobile;

