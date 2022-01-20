import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  topContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: height/3.2,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  title: {
    marginLeft: width/41.4,
    fontFamily: 'MontserratBold',
    marginTop: height / 6.89230769,
    color: 'white',
    fontSize: width / 16.56
  },
  subText: {
    padding: width/41.4,
    fontFamily: 'InconsolataLight',
    color: 'white',
    fontSize: width/23
  },
  uploadContainer: {
    position: 'relative',
    height: '40%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height/89.6,
    borderRadius: 25
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
    justifyContent: 'space-between',
    marginTop: height/89.6
  },
  uploadButton: {
    backgroundColor: '#159ea3',
  },
  continueButton: {
    backgroundColor: '#461ad6',
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
    fontSize: width/29.5714286
  },
  gradientContainer: {
    height: height/2.8, 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});