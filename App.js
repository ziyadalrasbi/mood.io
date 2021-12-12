import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home/Home';
import Upload from './pages/upload/Upload';

function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Upload' component={Upload} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;