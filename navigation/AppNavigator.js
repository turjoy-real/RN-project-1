import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import EditEmployeeScreen from '../screens/EditEmployeeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Employees" component={HomeScreen} />
          <Stack.Screen name="Edit Employee Details" component={EditEmployeeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default AppNavigator; 