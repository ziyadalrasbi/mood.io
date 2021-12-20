
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/pages/login/Login';
import Home from './frontend/pages/home/Home';
import Upload from './frontend/pages/upload/Upload';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Results from './frontend/pages/results/Results';

function App({ navigation }) {

    const Stack = createNativeStackNavigator();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const firebaseConfig = {
        apiKey: "AIzaSyD2bHyYmGh6PtM76lj-4FZu-EwWNRHtUTI",
        authDomain: "mood-io-be1cc.firebaseapp.com",
        projectId: "mood-io-be1cc",
        storageBucket: "mood-io-be1cc.appspot.com",
        messagingSenderId: "159561548589",
        appId: "1:159561548589:web:9148d9531100bcc6d609a4",
        measurementId: "G-R0QQ53XLDE"
    };

    firebase.initializeApp(firebaseConfig);
    
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user is '+ user);
              setUser(user);
            }
          });
          setLoading(false);
    },[loading])

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user != null ? 'Home' : 'Login'}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Upload' component={Upload} />
                <Stack.Screen name='Results' component={Results} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;