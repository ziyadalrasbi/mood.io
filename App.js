import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { registerRootComponent } from 'expo';
import { Button } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style = {{ color: 'blue', fontSize: 24}}
      > 
      mood.io
      </Text>
      <Button
        uppercase={false}
        mode="contained"
        color="#f08e25"
        contentStyle={{ height: 44 }}
        labelStyle={{ color: 'black', fontSize: 18 }}
      >
        Hello
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
