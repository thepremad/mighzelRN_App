import React, {useState} from 'react';
import TabNavigator from './TabNavigator';
import LoggedOutNavigator from './LoggedOutNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import PaymentUI from '../payment_gateway/PaymentUI';

const Routes = ({skipLogin}) => {
  const {mainRoute} = useSelector(state => state.route);
  const Stack = createNativeStackNavigator();

  return mainRoute === 'Splash' ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        statusBarHidden: true,
        // statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        // statusBarAnimation: 'slide',
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{}} />
    </Stack.Navigator>
  ) : mainRoute === 'Login' ? (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        navigationBarColor: '#000',
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen name="Login" component={TabNavigator} />
      <Stack.Screen name="Logout" component={LoggedOutNavigator} />
    </Stack.Navigator>
  ) : (
    <LoggedOutNavigator />
  );
};

export default Routes;
