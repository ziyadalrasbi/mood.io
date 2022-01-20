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
    marginBottom: height / 40.84,
    width: '100%',
    justifyContent: 'flex-start',
    borderRadius: 23,
    backgroundColor: 'white',
  },
  firstHeader: {
    fontFamily: 'MontserratBold',
    color: '#191414',
    fontSize: width / 27.6,
    padding: width / 41.4,
    marginBottom: -(width / 41.4),
    marginTop: height / 59.7333333
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: width / 29.5714286,
    padding: width / 41.4,
    color: 'grey'
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
    backgroundColor:'white',
  },
  gradientContainer: {
    height: height/2.8, 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  },
  recommendationsContainer: {
    marginHorizontal: width / 41.4,
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
  }
});