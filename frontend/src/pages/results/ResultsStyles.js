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
    marginBottom: height/35.84,
    justifyContent: 'flex-start',
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: width/18.8181818
  },
  scroll: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0d324d'
  },
  gradientContainer: {
    height: height/2.8, 
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
    color:'white',
    marginBottom: 10,
    alignSelf:'center'
  },
  saveText: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: '#dbdbdb',
    maxWidth:240
  },
  saveButton: {
    backgroundColor: '#1DB954',

  },
  saveButtonText: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    color: 'white',
  }
});