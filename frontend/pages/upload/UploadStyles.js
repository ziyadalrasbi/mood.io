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
  subTop: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    height: '2.5%',
    width: '100%',
    backgroundColor: '#2943e3',
  },
  title: {
    marginLeft: 10,
    fontFamily: 'InconsolataBold',
    marginTop: 120,
    color: 'white',
    fontSize: width / 13.8
  },
  subText: {
    padding: 10,
    fontFamily: 'InconsolataLight',
    color: 'white',
    fontSize: width / 21.7894737
  },
  uploadContainer: {
    position: 'relative',
    height: '40%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
    marginTop: 10
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
    height: 320, 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});