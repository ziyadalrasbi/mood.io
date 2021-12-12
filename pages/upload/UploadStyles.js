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
    uploadContainer: {
        position: 'relative',
        height: '40%',
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
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
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(41, 67, 227, 0.3)'
    },
    mainFont: {
      fontFamily: 'InconsolataMedium',
      fontSize: 22
    }
});