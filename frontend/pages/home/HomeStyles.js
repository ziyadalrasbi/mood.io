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
    justifyContent: 'flex-start',
    borderRadius: 23,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  firstHeader: {
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: width / 27.6,
    padding: width / 41.4,
    marginBottom: -(width / 41.4),
    marginTop: height / 59.7333333
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: '#dbdbdb'
  },
  startButton: {
    backgroundColor: '#4ca1af',
    marginLeft: width / 41.4,
    marginTop: height / 59.7333333,
    padding: width / 82.8,
    alignSelf: 'flex-start'
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
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: 17
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
    maxWidth: width / 4.14,
    marginRight: width / 20.7,
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
    padding: width / 41.4,
    borderColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start'
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
    maxWidth: width / 1.38,
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
    maxWidth: width / 1.38
  },
  topTrackArtistImage: {
    width: width / 4.14,
    height: width / 4.14,
    marginRight: width / 20.7,
    marginTop: height / 89.6,
    borderRadius: 100
  },
  topTrackImage: {
    width: 60,
    height: 60,
    marginRight: width / 20.7,
    marginTop: height / 89.6,
    borderRadius: 5
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
  noDataText: {
    marginTop: height / 179.2,
    fontFamily: 'MontserratBold',
    color: 'grey',
    fontSize: width / 31.8461538,
    marginRight: width / 41.4,
    padding: 10,
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
  }
});

