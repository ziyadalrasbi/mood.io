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
    backgroundColor: 'white',
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
  firstContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 25,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 25
  },
  firstHeader: {
    fontFamily: 'InconsolataBold',
    color: '#191414',
    fontSize: 15,
    padding: 10,
    marginBottom: -10,
    marginTop: 15
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: 14,
    padding: 10,
    color: 'grey'
  },
  moodAnalysis: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: 25,
    justifyContent: 'flex-start',
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: 22
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor:'white',
  },
  gradientContainer: {
    height: 320, 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});