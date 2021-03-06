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
    fontFamily: 'MontserratLight',
    color: 'white',
    fontSize: getRatio(16.56)
  },
  uploadContainer: {
    position: 'relative',
    height: getRatio(450),
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getRatio(10),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'white',
    borderTopColor: 'white',
    borderRadius: 1
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: getRatio(10)
  },
  mainFont: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(14)
  },
  gradientContainer: {
    height: getRatio(320),
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0d324d'
  },
  gradientContainer: {
    height: '100%',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    position: 'absolute'
  },
  lottieView: {
    marginLeft: -(getRatio(15)),
    width: getRatio(85),
    height: getRatio(85)
  },
  noteText: {
    fontFamily: 'MontserratLight',
    fontSize: getRatio(13),
    color: 'white',
    marginTop: getRatio(30)
  },
  continueButton: {
    alignSelf: 'center',
    backgroundColor: '#7474BF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },
  continueText: {
    fontFamily: 'MontserratBold',
    fontSize: getRatio(12)
  },
  uploadButton: {
    alignSelf: 'center',
    backgroundColor: '#159ea3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginTop: getRatio(10)
  },
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
    fontFamily: 'MontserratLight',
    color: 'white',
    fontSize: width / 25
  },
  uploadContainer: {
    position: 'relative',
    height: height / 1.99111111,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height / 89.6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'white',
    borderTopColor: 'white',
    borderRadius: 1
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height / 89.6
  },
  mainFont: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 29.5714286
  },
  gradientContainer: {
    height: height / 2.8,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0d324d'
  },
  gradientContainer: {
    height: '100%',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    position: 'absolute'
  },
  lottieView: {
    marginLeft: -(width / 27.6),
    width: width / 4.87058824,
    height: width / 4.87058824
  },
  noteText: {
    fontFamily: 'MontserratLight',
    fontSize: width / 31.8461538,
    color: 'white',
    marginTop: height / 29.8666667
  },
  continueButton: {
    alignSelf: 'center',
    backgroundColor: '#7474BF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },
  continueText: {
    fontFamily: 'MontserratBold',
    fontSize: width / 34.5
  },
  uploadButton: {
    alignSelf: 'center',
    backgroundColor: '#159ea3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginTop: height / 89.6
  },
});

export default width > 500 ? tablet : mobile;