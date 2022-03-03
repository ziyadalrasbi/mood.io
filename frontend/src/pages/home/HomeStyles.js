import { PixelRatio, Platform, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
  return Math.min(PixelRatio.get() * value, value);
}

const ios = StyleSheet.create({
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
  firstContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: getRatio(22),
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
    fontSize: getRatio(15),
    padding: getRatio(10),
    marginTop: getRatio(15)
  },
  firstSubHeader: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(14),
    padding: getRatio(10),
    color: '#dbdbdb'
  },
  startButton: {
    backgroundColor: '#4ca1af',
    marginLeft: getRatio(10),
    marginTop: getRatio(15),
    padding: getRatio(5),
    alignSelf: 'flex-start'
  },
  secondContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: getRatio(25),
    width: '100%',
    justifyContent: 'flex-start',
  },
  secondHeader: {
    marginTop: 5,
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: getRatio(15),
    padding: getRatio(10),
    marginBottom: -(getRatio(10))
  },
  secondSubHeader: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(14),
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
  thirdContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: getRatio(25),
    justifyContent: 'flex-start',
  },
  thirdHeader: {
    marginTop: getRatio(5),
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: getRatio(15),
    padding: getRatio(10),
  },
  thirdSubHeader: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(14),
    padding: getRatio(10),
    color: '#dbdbdb'
  },
  topArtistsContainer: {
    marginHorizontal: getRatio(10),
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: getRatio(10),
  },
  topArtistText: {
    fontFamily: 'MontserratMedium',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: getRatio(10),
    marginBottom: getRatio(5),
    fontSize: getRatio(12),
    maxWidth: width / 4.14,
    marginRight: getRatio(20),
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
    marginTop: getRatio(5),
    marginBottom: -(getRatio(10)),
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: getRatio(15),
    padding: getRatio(10),
  },
  fourthSubHeader: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(14),
    padding: getRatio(10),
    color: '#dbdbdb'
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
    borderColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  topTrackText: {
    fontFamily: 'MontserratMedium',
    color: 'white',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginTop: getRatio(8),
    marginBottom: getRatio(5),
    fontSize: getRatio(12),
    fontStyle: 'italic',
    maxWidth: width / 1.38,
    marginRight: getRatio(20)
  },
  topRecommendationTrackText: {
    fontFamily: 'MontserratMedium',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: getRatio(10),
    marginBottom: getRatio(5),
    fontSize: getRatio(12),
    fontStyle: 'italic',
    maxWidth: getRatio(120),
    marginRight: getRatio(25),
  },
  topRecommendationTrackArtistText: {
    fontFamily: 'MontserratMedium',
    color: '#dbdbdb',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: getRatio(12),
    fontStyle: 'italic',
    maxWidth: getRatio(100),
    marginRight: getRatio(25),
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
    fontStyle: 'italic',
    marginRight: getRatio(20),
    maxWidth: width / 1.38
  },
  topTrackArtistImage: {
    width: getRatio(100),
    height: getRatio(100),
    marginRight: getRatio(20),
    marginLeft: getRatio(2),
    marginTop: getRatio(10),
    borderRadius: 100
  },
  topTrackImage: {
    width: getRatio(60),
    height: getRatio(60),
    marginRight: getRatio(20),
    marginTop: getRatio(10),
    borderRadius: 5
  },
  recommendationImage: {
    width: getRatio(120),
    height: getRatio(120),
    marginRight: getRatio(25),
    marginLeft: getRatio(2),
    marginTop: getRatio(20),
    borderRadius: 5
  },
  mainFont: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(16)
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#2b5876'
  },
  noDataText: {
    marginTop: getRatio(5),
    fontFamily: 'MontserratBold',
    color: 'grey',
    fontSize: getRatio(13),
    marginRight: getRatio(10),
    padding: getRatio(10),
    maxWidth: 390,
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
    marginTop: getRatio(6)
  },
  more: {
    width: getRatio(17),
    height: getRatio(17),
    marginLeft: -(getRatio(10)),
    marginTop: getRatio(1)
  },
  playImage: {
    width: getRatio(22),
    height: getRatio(22)
  },
  allContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getRatio(10)
  },
  fifthContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: getRatio(25),
    justifyContent: 'flex-start',
  },
  fifthHeader: {
    marginTop: getRatio(20),
    marginBottom: getRatio(20),
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: getRatio(15),
    padding: getRatio(10),
  },
});

const android = StyleSheet.create({
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

    marginTop: height / 59.7333333
  },
  firstSubHeader: {
    fontFamily: 'MontserratMedium',
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
    fontFamily: 'MontserratMedium',
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
    marginTop: height / 179.2,
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: width / 27.6,
    padding: width / 41.4,
  },
  thirdSubHeader: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
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
    fontFamily: 'MontserratMedium',
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
    fontFamily: 'MontserratMedium',
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  topTrackText: {
    fontFamily: 'MontserratMedium',
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
  topRecommendationTrackText: {
    fontFamily: 'MontserratMedium',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: height / 89.6,
    marginBottom: height / 179.2,
    fontSize: width / 34.5,
    fontStyle: 'italic',
    maxWidth: width / 3.45,
    marginRight: width / 16.56,
  },
  topRecommendationTrackArtistText: {
    fontFamily: 'MontserratMedium',
    color: '#dbdbdb',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: width / 34.5,
    fontStyle: 'italic',
    maxWidth: width / 4.14,
    marginRight: width / 16.56,
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
    fontStyle: 'italic',
    marginRight: width / 20.7,
    maxWidth: width / 1.38
  },
  topTrackArtistImage: {
    width: width / 4.14,
    height: width / 4.14,
    marginRight: width / 20.7,
    marginLeft: width / 207,
    marginTop: height / 89.6,
    borderRadius: 100
  },
  topTrackImage: {
    width: width / 6.9,
    height: width / 6.9,
    marginRight: width / 20.7,
    marginTop: height / 89.6,
    borderRadius: 5
  },
  recommendationImage: {
    width: width / 3.45,
    height: width / 3.45,
    maxWidth: 200,
    maxHeight: 200,
    marginRight: width / 16.56,
    marginLeft: width / 207,
    marginTop: height / 44.8,
    borderRadius: 5,
  },
  mainFont: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 25.875
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#2b5876'
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
    height: width / 24.3529412,
    marginLeft: -(width / 41.4),
    marginTop: height / 149.333333
  },
  more: {
    width: width / 24.3529412,
    height: width / 24.3529412,
    marginLeft: -(width / 41.4),
    marginTop: height / height
  },
  playImage: {
    width: 20,
    height: width / 18.8181818
  },
  allContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width / 41.4,

  },
  fifthContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: height / 35.84,
    justifyContent: 'flex-start',
  },
  fifthHeader: {
    marginTop: height / 44.8,
    marginBottom: height / 44.8,
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: width / 27.6,
    padding: width / 41.4,
  },
});

export default Platform.OS == 'android' ? android : ios;

