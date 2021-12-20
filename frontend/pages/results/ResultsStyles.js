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
    title: {
      padding: 10,
      fontFamily: 'InconsolataBold',
      color: 'white',
      fontSize: 50
    },
    subText: {
      padding: 10,
      fontFamily: 'InconsolataLight',
      color: 'white',
      fontSize: 26
    },
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(41, 67, 227, 0.3)'
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
    }
});