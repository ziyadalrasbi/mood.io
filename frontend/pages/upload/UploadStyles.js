import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  topContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: 280,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#2e41b3',
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
    padding: 10,
    marginTop: 120,
    fontFamily: 'InconsolataBold',
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
    width: '90%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: 10
  },
  uploadButton: {
    backgroundColor: '#159ea3'
  },
  continueButton: {
    backgroundColor: '#461ad6'
  },
  mainContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%'
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: 22
  }
});