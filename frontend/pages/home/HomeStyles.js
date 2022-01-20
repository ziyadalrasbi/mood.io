import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  topContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: height / 3.2,
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
    backgroundColor: 'white',
  },
  firstHeader: {
    fontFamily: 'MontserratBold',
    color: '#191414',
    fontSize: width / 27.6,
    padding: width / 41.4,
    marginBottom: -(width / 41.4),
    marginTop: height / 59.7333333
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: 'grey'
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
    color: '#191414',
    fontSize: width / 27.6,
    padding: width / 41.4,
    marginBottom: -(width / 41.4)
  },
  secondSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: 10,
    color: 'grey'
  },
  mainContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%'
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
    marginBottom: -10,
    fontFamily: 'MontserratBold',
    color: '#191414',
    fontSize: width / 27.6,
    padding: width / 41.4,
  },
  thirdSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: 10,
    color: 'grey'
  },
  topArtistsContainer: {
    marginHorizontal: width / 41.4,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: width / 41.4,
  },
  topArtistText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'blue',
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
    color: '#191414',
    fontSize: width / 27.6,
    padding: width / 41.4,
  },
  fourthSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: 'grey'
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
    justifyContent: 'space-evenly'
  },
  topTrackText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: height / 112,
    marginBottom: height / 179.2,
    fontSize: width / 34.5,
    fontStyle: 'italic',
    maxWidth: width / 3.45,
    marginRight: width / 20.7
  },
  topTrackArtistText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: width / 34.5,
    fontStyle: 'italic',
    maxWidth: width / 3.45,
    marginRight: width / 20.7
  },
  topTrackArtistImage: {
    width: width / 4.14,
    height: width / 4.14,
    marginRight: width / 20.7,
    marginTop: height / 89.6,
    borderRadius: 100
  },
  topTrackImage: {
    width: width / 3.45,
    height: width / 3.45,
    marginRight: width / 20.7,
    marginTop: height / 89.6,
    borderRadius: 20
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 25.875
  },
  scroll: {
    flex: 1,
    height: '100%'
  },
  noDataText: {
    marginTop: height / 179.2,
    fontFamily: 'MontserratBold',
    color: 'blue',
    fontSize: width / 31.8461538,
    marginRight: width / 41.4,
    padding: 10,
    maxWidth: width / 1.06153846,
  },
  gradientContainer: {
    height: height / 2.8,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  }
});

