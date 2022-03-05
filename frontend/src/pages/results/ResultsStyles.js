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
  secondContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
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
    fontFamily: 'MontserratLight',
    color: 'white',
    fontSize: getRatio(27)
  },
  subWelcome: {
    marginLeft: getRatio(10),
    marginTop: getRatio(29),
    marginBottom: getRatio(10),
    fontFamily: 'MontserratLight',
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
    fontSize: getRatio(26),
    padding: getRatio(10),
    marginTop: getRatio(15),
    marginBottom: getRatio(10)
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: getRatio(16),
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
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(15),
    color:'white'
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
    flex: 1,
    height: '100%',
    backgroundColor: '#09263b',
    borderWidth: 1,
    borderColor: 'grey'
  },
  trackContainer: {
    padding: getRatio(10),
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  trackImage: {
    width: getRatio(60),
    height: getRatio(60),
    marginRight: getRatio(20),
    marginTop: getRatio(10),
    borderRadius: 5
  },
  trackArtistText: {
    fontFamily: 'InconsolataMedium',
    color: '#dbdbdb',
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: getRatio(12),
    fontStyle: 'italic',
    marginRight: getRatio(20),
    maxWidth: getRatio(245)
  },
  trackText: {
    fontFamily: 'InconsolataMedium',
    color: 'white',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginTop: getRatio(8),
    marginBottom: getRatio(5),
    fontSize: getRatio(12),
    fontStyle: 'italic',
    maxWidth: getRatio(245),
    marginRight: getRatio(20)
  },
  rateText: {
    marginTop: getRatio(25),
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
    backgroundColor: '#1DB954'
  },
  playImage: {
    width: getRatio(22),
    height: getRatio(22)
  },
  saveButtonText: {
    fontFamily: 'InconsolataMedium',
    fontSize: getRatio(14),
    color: 'white',
  },
  lottieView: {
    marginTop: getRatio(10),
    width: getRatio(60),
    height: getRatio(60),
    alignSelf: 'center'
  },
  continueLottie: {
    width: getRatio(170),
    height: getRatio(170),
    marginTop: getRatio(50),
    alignSelf: 'center'
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: getRatio(25),
    padding: getRatio(10),
    justifyContent: 'center',
    backgroundColor: '#1DB954',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: getRatio(40),
    borderRadius: 5,
  },
  spotifyLogo: {
    width: getRatio(25),
    height: getRatio(25),
    resizeMode: 'contain',
    backgroundColor: 'transparent'
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
    flex: 2,
    flexDirection: 'row',
    width: '100%',
    borderRadius: width / 41.4
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