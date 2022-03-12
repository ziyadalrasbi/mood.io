import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
  return Math.min(PixelRatio.get() * value, value);
}

const mobile = StyleSheet.create({
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: width/1.18285714,
    height: width/1.18285714
  },  
  gradientContainer: {
    height: '100%', 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});

const tablet = StyleSheet.create({
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: getRatio(350),
    height:getRatio(350)
  }, 
  gradientContainer: {
    height: '100%', 
    left: 0,
    right: 0, 
    top: 0, 
    position: 'absolute'
  }
});

export default width > 500 ? tablet : mobile;
