import { StyleSheet } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

const getRatio = (value) => {
    return Math.min(PixelRatio.getFontScale() * value, value);
}

const tablet = StyleSheet.create({
    selectText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(13),
    },
    selectButton: {
        backgroundColor: '#4494da',
        marginHorizontal: getRatio(70),
        marginBottom: -(getRatio(20)),
    },
    clearButton: {
        backgroundColor: 'red',
        minWidth: getRatio(90),
        marginRight: getRatio(50)
    },
    continueButton: {
        backgroundColor: 'purple'
    },
    artistText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(13),
        maxWidth: getRatio(183),
        textAlign: 'left',
        marginLeft: getRatio(5)
    },
    removeArtistText: {
        fontFamily: 'MontserratBold',
        fontSize: getRatio(13),
        maxWidth: getRatio(183),
        textAlign: 'left',
        paddingHorizontal: getRatio(5)
    },
    artistImage: {
        width: getRatio(50),
        height: getRatio(50),
        borderRadius: 5
    },
    addImage: {
        width: getRatio(30),
        height: getRatio(30)
    },
    removeImage: {
        width: getRatio(23),
        height: getRatio(23)
    }
});

const mobile = StyleSheet.create({
    selectText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 31.8461538,
    },
    selectButton: {
        backgroundColor: '#4494da',
        marginHorizontal: width / 5.91428571,
        marginBottom: -(height / 44.8),
    },
    clearButton: {
        backgroundColor: 'red',
        minWidth: width / 4.6,
        marginRight: width / 8.28
    },
    continueButton: {
        backgroundColor: 'purple'
    },
    artistText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 31.8461538,
        maxWidth: width / 2.26229508,
        textAlign: 'left',
        marginLeft: width / 82.8
    },
    removeArtistText: {
        fontFamily: 'MontserratBold',
        fontSize: width / 31.8461538,
        maxWidth: width / 2.26229508,
        textAlign: 'left',
        paddingHorizontal: width / 82.8
    },
    artistImage: {
        width: width / 8.28,
        height: width / 8.28,
        borderRadius: 5
    },
    addImage: {
        width: width / 13.8,
        height: width / 13.8
    },
    removeImage: {
        width: width / 18,
        height: width / 18
    }
});

export default width > 500 ? tablet : mobile;