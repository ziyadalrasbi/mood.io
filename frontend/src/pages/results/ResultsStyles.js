import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
  return Math.min(PixelRatio.get() * value, value);
}

const ios = StyleSheet.create({
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
    height: getRatio(87),
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
    marginLeft: getRatio(10),
    marginTop: getRatio(29),
    marginBottom: getRatio(10),
    fontFamily: 'InconsolataLight',
    color: 'white',
    fontSize: getRatio(16.56)
  },
  firstContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    justifyContent: 'flex-start',
  },
  firstHeader: {
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: getRatio(15),
    padding: getRatio(10),
    marginTop: getRatio(15),
    marginBottom: getRatio(10)
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: getRatio(14),
    padding: getRatio(10),
    color: '#dbdbdb'
  },
  secondHeader: {
    marginTop: 5,
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: getRatio(15),
    padding: getRatio(10),
    marginBottom: -(getRatio(10))
  },
  moodAnalysis: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: getRatio(25),
    justifyContent: 'flex-start',
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: getRatio(22)
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0d324d'
  },
  gradientContainer: {
    height: getRatio(320),
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  recommendationsContainer: {

    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: getRatio(10),
  },
  trackImage: {
    width: getRatio(120),
    height: getRatio(120),
    marginRight: getRatio(20),
    marginTop: getRatio(10),
    borderRadius: 20
  },
  trackArtistText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: getRatio(12),
    fontStyle: 'italic',
    maxWidth: getRatio(120),
    marginRight: width / 20.7
  },
  trackText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: getRatio(8),
    marginBottom: getRatio(5),
    fontSize: getRatio(12),
    fontStyle: 'italic',
    maxWidth: getRatio(120),
    marginRight: getRatio(20)
  },
  rateText: {
    fontFamily: 'MontserratBold',
    fontSize: 11,
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center'
  },
  saveText: {
    fontFamily: 'InconsolataMedium',
    fontSize: getRatio(14),
    padding: getRatio(10),
    color: '#dbdbdb',
    maxWidth: getRatio(240)
  },
  saveButton: {
    backgroundColor: '#1DB954',

  },
  saveButtonText: {
    fontFamily: 'InconsolataMedium',
    fontSize: getRatio(14),
    color: 'white',
  },
  lottieView: {
    marginLeft: getRatio(25),
    marginTop: getRatio(-5),
    width: getRatio(60),
    height: getRatio(60),
    alignSelf: 'center'
  }
});

const android = StyleSheet.create({
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
    marginBottom: height / 89.6,
    maxWidth: width / 1.01764706,
    fontFamily: 'InconsolataLight',
    color: 'white',
    fontSize: width / 25
  },
  firstContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    justifyContent: 'flex-start',
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
  secondHeader: {
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: width / 27.6,
    padding: width / 41.4,
    marginBottom: -(width / 41.4),

  },
  moodAnalysis: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: height / 35.84,
    justifyContent: 'flex-start',
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 18.8181818
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0d324d'
  },
  gradientContainer: {
    height: height / 2.8,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  recommendationsContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: width / 41.4,
  },
  trackImage: {
    width: width / 3.45,
    height: width / 3.45,
    marginRight: width / 20.7,
    marginTop: height / 89.6,
    borderRadius: 20
  },
  trackArtistText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: width / 34.5,
    fontStyle: 'italic',
    maxWidth: width / 3.45,
    marginRight: width / 20.7
  },
  trackText: {
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
  rateText: {
    fontFamily: 'MontserratBold',
    fontSize: 11,
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center'
  },
  saveText: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: '#dbdbdb',
    maxWidth: 240
  },
  saveButton: {
    backgroundColor: '#1DB954',
  },
  saveButtonText: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    color: 'white',
  },
  lottieView: {
    marginLeft: width / 16.56,
    marginTop: -(height / 179.2),
    width: width / 6.9,
    height: width / 6.9,
    alignSelf: 'center'
  }
});

export default Platform.OS == 'android' ? android : ios;