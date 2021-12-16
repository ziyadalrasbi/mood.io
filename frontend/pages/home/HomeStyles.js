import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    topContainer: {
      position: 'relative',
      left: 0,
      right: 0,
      top: 0,
      height: 300,
      width: '100%',
      justifyContent: 'center',
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
      padding: 10,
      fontFamily: 'InconsolataBold',
      color: 'white',
      fontSize: 50
    },
    subWelcome: {
      padding: 10,
      fontFamily: 'InconsolataLight',
      color: 'white',
      fontSize: 26
    },
    firstContainer: {
      position: 'relative',
      left: 0,
      right: 0,
      top: 0,
      height: 190,
      width: '100%',
      justifyContent: 'flex-start',
    },
    firstHeader: {
      marginTop: 5,
      fontFamily: 'InconsolataBlack',
      fontSize: 22,
      padding: 10,
      marginBottom: -10
    },
    firstSubHeader: {
      fontFamily: 'InconsolataMedium',
      fontSize: 18,
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
      height: 190,
      width: '100%',
      justifyContent: 'flex-start',
    },
    secondHeader: {
      marginTop: 5,
      fontFamily: 'InconsolataBlack',
      fontSize: 22,
      padding: 10,
      marginBottom: -10
    },
    secondSubHeader: {
      fontFamily: 'InconsolataMedium',
      fontSize: 18,
      padding: 10,
      color: 'grey'
    },
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-start',
      height: '100%'
    },
    mainFont: {
      fontFamily: 'InconsolataMedium',
      fontSize: 22
    },
    thirdContainer: {
      position: 'relative',
      left: 0,
      right: 0,
      top: 0,
      width: '100%',
      justifyContent: 'flex-start',
    },
    thirdHeader: {
      marginTop: 5,
      marginBottom: -10,
      fontFamily: 'InconsolataBlack',
      fontSize: 22,
      padding: 10,
    },
    thirdSubHeader: {
      fontFamily: 'InconsolataMedium',
      fontSize: 18,
      padding: 10,
      color: 'grey'
    },
    topArtistsContainer: {
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between'
    },
    topArtistText: {
      fontFamily: 'InconsolataSemiExpanded',
      color: 'blue',
      alignSelf: 'center',
      marginBottom: 5,
      fontSize: 15,
      fontStyle: 'italic',
      maxWidth: 130
    },
    mainContainer: {
      flex: 1,
      backgroundColor: 'rgba(100,200,300,0.2)',
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    mainFont: {
      fontFamily: 'InconsolataMedium',
      fontSize: 22
    },
    scroll: {
      flex: 1,
      height: '100%'
    }
});