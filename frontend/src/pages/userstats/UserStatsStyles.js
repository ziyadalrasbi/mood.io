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
        borderRadius: getRatio(23),
        backgroundColor: 'transparent',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    profilePicture: {
        width: getRatio(100),
        height: getRatio(100),
        marginTop: getRatio(10),
        borderRadius: getRatio(100),
        borderWidth: 1,
        borderColor: 'white'
    },
    firstHeader: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: getRatio(15),
        padding: getRatio(10),
        marginBottom: -(getRatio(12)),
        marginTop: getRatio(5)
    },
    topTrackArtistImage: {
        width: getRatio(115),
        height: getRatio(115),
        marginTop: getRatio(10),
        borderRadius: 100
    },
    firstSubHeader: {
        fontFamily: 'MontserratMedium',
        fontSize: getRatio(14),
        padding: getRatio(10),
        color: '#dbdbdb'
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: -getRatio(10),
        marginTop: getRatio(5),
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
    mainContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        marginBottom: -(getRatio(450))
    },
    topArtistsContainer: {
        marginHorizontal: getRatio(10),
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderRadius: getRatio(10)
    },
    topArtistText: {
        fontFamily: 'MontserratMedium',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: getRatio(10),
        marginBottom: getRatio(5),
        fontSize: getRatio(12),
        
        maxWidth: getRatio(100)
    },
    topSongsContainer: {
        padding: getRatio(10),
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    topTracksContainer: {
        padding: getRatio(10),
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topTrackText: {
        fontFamily: 'MontserratMedium',
        color: 'white',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginTop: getRatio(8),
        marginBottom: getRatio(5),
        fontSize: getRatio(12),
        
        maxWidth: getRatio(300),
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
        maxWidth: getRatio(300)
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
    mainFont: {
        fontFamily: 'MontserratMedium',
        fontSize: getRatio(16)
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
        maxWidth: getRatio(390)
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
        width: getRatio(17),
        height: getRatio(17),
        marginLeft: -(getRatio(10)),
        marginTop: getRatio(7.5)
    },
    artistsRouteContainer: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1,
        justifyContent: 'center'
    },
    tracksRouteContainer: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        flex: 1
    },
    tabBarText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(14)
    },
    tabContainer: {
        marginTop: 2
    },
    lottieView: {
        marginTop: getRatio(50),
        width: getRatio(100),
        height: getRatio(100),
        alignSelf: 'center'
    },
    lottieViewTracks: {
        marginTop: getRatio(50),
        width: getRatio(100),
        height: getRatio(100),
        alignSelf: 'center'
    },
    opacityContainer: {
        borderRadius: getRatio(10),
        height: getRatio(35),
        justifyContent: 'center'
    }
});

const mobile = StyleSheet.create({
    topContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: height / 8.14545455,
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
        marginBottom: height / 89.6,
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
    profilePicture: {
        width: width / 4.14,
        height: width / 4.14,
        marginTop: height / 89.6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    firstHeader: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        padding: width / 41.4,
        marginBottom: -(height / 74.6666667),
        marginTop: height / 179.2
    },
    topTrackArtistImage: {
        width: width / 3.6,
        height: width / 3.6,
        marginTop: height / 89.6,
        borderRadius: 100
    },
    firstSubHeader: {
        fontFamily: 'MontserratMedium',
        fontSize: width / 29.5714286,
        padding: width / 41.4,
        color: '#dbdbdb'
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: -width / 41.4
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
    topArtistsContainer: {
        marginHorizontal: height / 89.6,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10
    },
    topArtistText: {
        fontFamily: 'MontserratMedium',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: height / 89.6,
        marginBottom: height / 179.2,
        fontSize: width / 34.5,
        
        maxWidth: width / 4.14
    },
    topSongsContainer: {
        padding: width / 41.4,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    topTracksContainer: {
        padding: width / 41.4,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    mainFont: {
        fontFamily: 'MontserratMedium',
        fontSize: width / 25.875
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
        fontSize: getRatio(13),
        marginRight: width / 41.4,
        padding: width / 41.4,
        maxWidth: width / 1.06153846
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
        height: width / 24.3529412,
        marginLeft: -(width / 41.4),
        marginTop: height / 119.466667
    },
    artistsRouteContainer: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1,
        justifyContent: 'center'
    },
    tracksRouteContainer: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        flex: 1
    },
    tabBarText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 29.5714286
    },
    tabContainer: {
        marginTop: Platform.OS == 'android' ? height/9.8 : height / 448
    },
    lottieView: {
        marginTop: height / 17.92,
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
    opacityContainer: {
        borderRadius: 10,
        height: height / 25.6,
        justifyContent: 'center'
    }
});

export default width > 500 ? tablet : mobile;

