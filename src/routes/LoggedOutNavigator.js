import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from '../screens/LoginScreens';
import SignUp from '../screens/SignUp';
import Categories from '../screens/Categories';

const LoggedOutNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreens} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default LoggedOutNavigator;
