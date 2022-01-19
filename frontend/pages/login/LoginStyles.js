import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  bottomContainer: {
    position: 'relative',
    height: height/1.90638298,
    justifyContent: 'flex-start',
    flexDirection:'column',
    backgroundColor: 'transparent',
    borderRadius: 7
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#374edb',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  logo: {
    flex: 1,
    justifyContent: 'center'
  }
});