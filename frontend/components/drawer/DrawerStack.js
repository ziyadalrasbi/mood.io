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

const Drawer = createDrawerNavigator();

const DrawerStack = ({loading, verified}) => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false, swipeEdgeWidth: -1 }}
            initialRouteName={!loading && verified == true ? 'Home' : 'Login'}
            initialParams={loading}
            backBehavior='history'
        >
            <Drawer.Screen name='UserStats' component={UserStats} initialParams={{ index: 0 }} />
            <Drawer.Screen name='Login' component={Login} />
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='UploadOptions' component={UploadOptions} />
            <Drawer.Screen name='Upload' component={Upload} />
            <Drawer.Screen name='SelectMood' component={SelectMood} />
            <Drawer.Screen name='Results' component={Results} />
        </Drawer.Navigator>
    );
}

export default DrawerStack;