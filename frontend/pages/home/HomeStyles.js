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
    height: 20,
    width: '100%',
    backgroundColor: '#2943e3',
  },
  welcome: {
    marginLeft: 10,
    fontFamily: 'InconsolataBold',
    marginTop: 120,
    color: 'white',
    fontSize: width / 13.8
  },
  subWelcome: {
    padding: 10,
    fontFamily: 'InconsolataLight',
    color: 'white',
    fontSize: width / 21.7894737
  },
  firstContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 25,
    width: '100%',
    justifyContent: 'flex-start',
  },
  firstHeader: {
    marginTop: 5,
    fontFamily: 'InconsolataBold',
    color: '#191414',
    fontSize: 15,
    padding: 10,
    marginBottom: -10
  },
  firstSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: 14,
    padding: 10,
    color: 'grey'
  },
  startButton: {
    backgroundColor: '#4494da',
    marginLeft: 8,
    marginTop: 15,
    padding: 5,
    alignSelf: 'flex-start'
  },
  secondContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 25,
    width: '100%',
    justifyContent: 'flex-start',
  },
  secondHeader: {
    marginTop: 5,
    fontFamily: 'InconsolataBold',
    color: '#191414',
    fontSize: 15,
    padding: 10,
    marginBottom: -10
  },
  secondSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: 14,
    padding: 10,
    color: 'grey'
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
    fontSize: 17
  },
  thirdContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    marginBottom: 25,
    justifyContent: 'flex-start',
  },
  thirdHeader: {
    marginTop: 5,
    marginBottom: -10,
    fontFamily: 'InconsolataBold',
    color: '#191414',
    fontSize: 15,
    padding: 10,
  },
  thirdSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: 14,
    padding: 10,
    color: 'grey'
  },
  topArtistsContainer: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10
  },
  topArtistText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'blue',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    fontStyle: 'italic',
    maxWidth: 100,
    marginRight: 20,
  },
  fourthContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    justifyContent: 'flex-start',
  },
  fourthHeader: {
    marginTop: 5,
    marginBottom: -10,
    fontFamily: 'InconsolataBold',
    color: '#191414',
    fontSize: 15,
    padding: 10,
  },
  fourthSubHeader: {
    fontFamily: 'InconsolataMedium',
    fontSize: 14,
    padding: 10,
    color: 'grey'
  },
  topSongsContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  topTracksContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  topTrackText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 5,
    fontSize: 12,
    fontStyle: 'italic',
    maxWidth: 120,
    marginRight: 20
  },
  topTrackArtistText: {
    fontFamily: 'InconsolataSemiExpanded',
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    maxWidth: 120,
    marginRight: 20
  },
  topTrackArtistImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 100
  },
  topTrackImage: {
    width: 120,
    height: 120,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 20
  },
  mainFont: {
    fontFamily: 'InconsolataMedium',
    fontSize: 17
  },
  scroll: {
    flex: 1,
    height: '100%'
  },
  noDataText: {
    marginTop: 5,
    fontFamily: 'InconsolataBold',
    color: 'blue',
    fontSize: 13,
    marginRight: 10,
    padding: 10,
    maxWidth: width / 1.06153846,
  },
});

