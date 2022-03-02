import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserStats from '../../pages/userstats/UserStats';
import CustomDrawer from './CustomDrawer';
import Login from '../../pages/login/Login';
import Home from '../../pages/home/Home';
import Upload from '../../pages/upload/Upload';
import Results from '../../pages/results/Results';
import UploadOptions from '../../pages/UploadOptions/UploadOptions';
import SelectMood from '../../pages/selectmood/SelectMood';
import Recommendations from '../../pages/recommendations/Recommendations';
import Habits from '../../pages/habits/Habits';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} options={{unmountOnBlur:true}} />
        </Stack.Navigator>
    )
}

const DrawerStack = ({loading, verified}) => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false, swipeEdgeWidth: -1 }}
            initialRouteName={!loading && verified == true ? 'Home' : 'Login'}
            initialParams={loading}
            backBehavior='history'
            defaultStatus='closed'
        >
            <Drawer.Screen name='LoginStack' component={LoginStack} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='UserStats' component={UserStats} initialParams={{ index: 0 }} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='UploadOptions' component={UploadOptions} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Upload' component={Upload} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='SelectMood' component={SelectMood} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Results' component={Results} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Recommendations' component={Recommendations} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Habits' component={Habits} options={{unmountOnBlur:true}} />
        </Drawer.Navigator>
    );
}

export default DrawerStack;