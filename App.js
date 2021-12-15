import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Upload from './pages/upload/Upload';

function App() {

    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;