import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
  return Math.min(PixelRatio.get() * value, value);
}

const tablet = StyleSheet.create({
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
  secondTopContainer: {
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
    fontFamily: 'MontserratMedium',
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
    color: 'white'
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
    fontFamily: 'MontserratMedium',
    color: '#dbdbdb',
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: getRatio(12),
    fontStyle: 'italic',
    marginRight: getRatio(20),
    maxWidth: getRatio(245)
  },
  trackText: {
    fontFamily: 'MontserratMedium',
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
    fontFamily: 'MontserratMedium',
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
    fontFamily: 'MontserratMedium',
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
    alignSelf: 'flex-end'
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
    borderRadius: 5,
  },
  spotifyLogo: {
    width: getRatio(25),
    height: getRatio(25),
    resizeMode: 'contain',
    backgroundColor: 'transparent'
  },
  spacer: {
    height: getRatio(415)
  }
});

const mobile = StyleSheet.create({
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
    height: height / 10.2988506,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  secondTopContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: height/ 10.2988506,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  welcome: {
    marginLeft: width / 41.4,
    fontFamily: 'MontserratLight',
    color: 'white',
    fontSize: width / 15.3333333
  },
  subWelcome: {
    marginLeft: width / 41.4,
    marginTop: height / 30.8965517,
    marginBottom: width / 41.4,
    fontFamily: 'MontserratLight',
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
    fontSize: width / 15.9230769,
    padding: width / 41.4,
    marginTop: height / 59.7333333,
    marginBottom: width / 41.4
  },
  firstSubHeader: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 25.875,
    padding: width / 41.4,
    color: '#dbdbdb'
  },
  secondHeader: {
    marginTop: height / 179.2,
    fontFamily: 'MontserratBold',
    color: 'white',
    fontSize: width / 27.6,
    padding: width / 41.4,
    marginBottom: -(width / 41.4)
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
    fontFamily: 'MontserratMedium',
    fontSize: width / 27.6,
    color: 'white'
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
    flex: 1,
    height: '100%',
    backgroundColor: '#09263b',
    borderWidth: 1,
    borderColor: 'grey'
  },
  trackContainer: {
    padding: width / 41.4,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  trackImage: {
    width: width / 6.9,
    height: width / 6.9,
    marginRight: width / 20.7,
    marginTop: width / 41.4,
    borderRadius: 5
  },
  trackArtistText: {
    fontFamily: 'MontserratMedium',
    color: '#dbdbdb',
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: width / 34.5,
    fontStyle: 'italic',
    marginRight: width / 20.7,
    maxWidth: width / 1.68979592
  },
  trackText: {
    fontFamily: 'MontserratMedium',
    color: 'white',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginTop: height / 112,
    marginBottom: height / 179.2,
    fontSize: width / 34.5,
    fontStyle: 'italic',
    maxWidth: width / 1.68979592,
    marginRight: width / 20.7
  },
  rateText: {
    marginTop: height / 35.84,
    fontFamily: 'MontserratBold',
    fontSize: width / 37.6363636,
    color: 'white',
    marginBottom: height / 89.6,
    alignSelf: 'center'
  },
  saveText: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: '#dbdbdb',
    maxWidth: width / 1.725
  },
  saveButton: {
    backgroundColor: '#1DB954'
  },
  playImage: {
    width: width / 18.8181818,
    height: width / 18.8181818
  },
  saveButtonText: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 29.5714286,
    color: 'white',
  },
  lottieView: {
    marginTop: width / 41.4,
    width: width / 6.9,
    height: width / 6.9,
    alignSelf: 'center'
  },
  continueLottie: {
    width: width / 2.43529412,
    height: width / 2.43529412,
    alignSelf: 'center'
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height / 35.84,
    padding: width / 41.4,
    justifyContent: 'center',
    backgroundColor: '#1DB954',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 5,
  },
  spotifyLogo: {
    width: width / 16.56,
    height: width / 16.56,
    resizeMode: 'contain',
    backgroundColor: 'transparent'
  },
  spacer: {
    height: height / 2.15903614
  }
});

export default width > 500 ? tablet : mobile;