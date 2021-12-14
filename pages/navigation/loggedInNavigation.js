import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Upload from '../upload/Upload';

const Tab = createBottomTabNavigator();

export default function LoggedInNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Upload" component={Upload} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}