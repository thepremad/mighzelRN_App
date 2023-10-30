import React, {useState} from 'react';
import TabNavigator from './TabNavigator';
import LoggedOutNavigator from './LoggedOutNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from '../screens/LoginScreens';
import SignUp from '../screens/SignUp';

const Routes = ({skipLogin}) => {
  return skipLogin ? <TabNavigator /> : <LoggedOutNavigator />;
};

export default Routes;
