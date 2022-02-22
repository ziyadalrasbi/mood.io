import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
  return Math.min(PixelRatio.get() * value, value);
}

const android = StyleSheet.create({
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
  },
  gradientContainer: {
    height: '100%', 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});

const ios = StyleSheet.create({
  bottomContainer: {
    position: 'relative',
    height: getRatio(470),
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
  },
  gradientContainer: {
    height: '100%', 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});

export default Platform.OS == 'android' ? android : ios;
