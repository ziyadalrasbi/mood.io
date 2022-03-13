import { StyleSheet } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
  return Math.min(PixelRatio.getFontScale() * value, value);
}

const tablet = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getRatio(22)
  },
  modalView: {
    margin: getRatio(20),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: getRatio(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: getRatio(800)
  },
  button: {
    borderRadius: 20,
    padding: getRatio(10),
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalTitleText: {
    fontFamily: 'MontserratBold',
    fontSize: getRatio(15),
    marginBottom: getRatio(15),
    textAlign: 'center'
  },
  modalSubText: {
    fontFamily: 'MontserratMedium',
    fontSize: getRatio(12),
    marginBottom: getRatio(15),
    textAlign: 'center'
  }
});

const mobile = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 40.7272727
  },
  modalView: {
    margin: width / 20.7,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width / 11.8285714,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 1.12
  },
  button: {
    borderRadius: 20,
    padding: width / 41.4,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalTitleText: {
    fontFamily: 'MontserratBold',
    fontSize: width / 27.6,
    marginBottom: height / 59.7333333,
    textAlign: 'center'
  },
  modalSubText: {
    fontFamily: 'MontserratMedium',
    fontSize: width / 34.5,
    marginBottom: height / 59.7333333,
    textAlign: 'center'
  }
});

export default width > 500 ? tablet : mobile;