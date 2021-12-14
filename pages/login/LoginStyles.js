import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    topContainer: {
      position: 'relative',
      left: 0,
      right: 0,
      top: 0,
      height: '30%',
      width: '100%',
      justifyContent: 'center',
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
      height: '20%',
      width: '100%',
      justifyContent: 'flex-start',
      backgroundColor: 'white'
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
      height: '20%',
      width: '100%',
      justifyContent: 'flex-start',
      backgroundColor: 'white'
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
      justifyContent: 'flex-start'
    },
    mainFont: {
      fontFamily: 'InconsolataMedium',
      fontSize: 22
    }
});