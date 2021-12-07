import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { registerRootComponent } from 'expo';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font' 

function App() {
  


  const [loaded] = useFonts({
    InconsolataBold: require('./assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('./assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('./assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('./assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={topStyles.container}>
        <Text style={topStyles.welcome}>
        welcome, user! 
        </Text> 
        <Text style={topStyles.subWelcome}>
        how are you feeling today? 
        </Text> 
      </View> 
      <View style={topStyles.subTop}>
      </View>
      <View style={firstStyles.container}>
        <Text style={firstStyles.header}>
          let's find some new music!
        </Text>
        <Text style={firstStyles.subHeader}>
          press the button below to scan your mood 😎
        </Text>
        <Button
        style={firstStyles.startButton}
        uppercase={false}
        mode="contained"
        labelStyle={styles.font }
      >
        get started
      </Button>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const topStyles = StyleSheet.create({
  container: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#463aaa'
  },
  subTop: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    height: '2%',
    width:'100%',
    backgroundColor: '#6b5be0'
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
  }
})

const firstStyles = StyleSheet.create({
  container: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: '20%',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  header: {
    marginTop: 5,
    fontFamily: 'InconsolataBlack',
    fontSize: 22,
    padding: 10,
    marginBottom: -10
  },
  subHeader: {
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
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  font: {
    fontFamily: 'InconsolataMedium',
    fontSize: 22
  }
});

export default App;
