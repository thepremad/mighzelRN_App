import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from '../screens/LoginScreens';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';

const LoggedOutNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: '#000',
        animation: 'slide_from_right',
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreens} />
      <Stack.Screen name="SignUpScreen" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

// LoggedOutNavigator.options = {
//   tabBarStyle: {display: 'none'},
// };

export default LoggedOutNavigator;
