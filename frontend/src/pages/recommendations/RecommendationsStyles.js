import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
        fontFamily: 'InconsolataLight',
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
        paddingHorizontal: width / 41.4,
        paddingVertical: 5
    },
    topTrackArtistImage: {
        width: width / 3.6,
        height: width / 3.6,
        marginTop: height / 89.6,
        borderRadius: 100
    },
    firstSubHeader: {
        fontFamily: 'InconsolataMedium',
        fontSize: width / 29.5714286,
        paddingHorizontal: width / 41.4,
        paddingVertical: 5,
        color: '#dbdbdb'
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: -10,
        marginTop: 5
    },
    selectButtonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectIcon: {
        padding: width / 82.8,
        width: width / 27.6,
        height: height / 59.7333333,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'grey'
    },
    selectText: {
        color: 'white',
        fontFamily: 'InconsolataMedium',
        fontSize: width / 37.6363636,
        paddingHorizontal: width / 82.8
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
    secondHeader: {
        marginTop: 5,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        padding: width / 41.4,
        marginBottom: -(width / 41.4)
    },
    secondSubHeader: {
        fontFamily: 'InconsolataMedium',
        fontSize: width / 29.5714286,
        padding: 10,
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
    thirdContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        marginBottom: height / 35.84,
        justifyContent: 'flex-start',
    },
    thirdHeader: {
        marginTop: 5,
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        padding: width / 41.4,
    },
    thirdSubHeader: {
        fontFamily: 'InconsolataMedium',
        fontSize: width / 29.5714286,
        padding: 10,
        color: '#dbdbdb'
    },
    topArtistsContainer: {
        marginHorizontal: width / 41.4,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderRadius: width / 41.4,
    },
    topArtistText: {
        fontFamily: 'InconsolataMedium',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: height / 89.6,
        marginBottom: height / 179.2,
        fontSize: width / 34.5,
        fontStyle: 'italic',
        maxWidth: width / 4.14
    },
    fourthContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        justifyContent: 'flex-start',
    },
    fourthHeader: {
        marginTop: height / 179.2,
        marginBottom: -(width / 89.6),
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: width / 27.6,
        padding: width / 41.4,
    },
    fourthSubHeader: {
        fontFamily: 'InconsolataMedium',
        fontSize: width / 29.5714286,
        padding: width / 41.4,
        color: '#dbdbdb'
    },
    topSongsContainer: {
        padding: width / 41.4,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
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
        backgroundColor: '#09263b',
        padding: width / 41.4,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTrackText: {
        fontFamily: 'InconsolataMedium',
        color: 'white',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginTop: height / 112,
        marginBottom: height / 179.2,
        fontSize: width / 34.5,
        fontStyle: 'italic',
        maxWidth: width / 1.47857143,
        marginRight: width / 20.7
    },
    topTrackTextContainer: {
        alignSelf: 'center'
    },
    topTrackArtistText: {
        fontFamily: 'InconsolataMedium',
        color: '#dbdbdb',
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: width / 34.5,
        fontStyle: 'italic',
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
        fontFamily: 'InconsolataMedium',
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
        fontSize: width / 31.8461538,
        marginRight: width / 41.4,
        padding: width / 41.4,
        maxWidth: width / 1.06153846,
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
    recommendationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height / 89.6
    },
    lottieView: {
        width: width / 6.9,
        height: width / 6.9,
        marginRight: width / 82.8,
        alignSelf: 'center'
    },
    openSpotify: {
        backgroundColor: 'rgba(120, 120, 120, 0.5)',
        borderRadius: 5,
        marginRight: 5
    },
    saveToSpotify: {
        backgroundColor: '#1DB954',
        borderRadius: 5,
        marginRight: width / 82.8
    }
});

