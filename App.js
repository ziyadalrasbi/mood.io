
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/pages/login/Login';
import Home from './frontend/pages/home/Home';
import Upload from './frontend/pages/upload/Upload';

function App() {

    const Stack = createNativeStackNavigator();

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Upload' component={Upload} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;