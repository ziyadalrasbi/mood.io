import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
  uploadContainer: {
    position: 'relative',
    height: 450,
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
    alignItems:'center',
    alignSelf:'center',
    marginTop: height / 89.6
  },
  uploadButton: {
    backgroundColor: '#159ea3',
    marginTop: 10
  },
  continueButton: {
    backgroundColor: '#461ad6',
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
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
  }
});