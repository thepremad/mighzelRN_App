import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CartStack from './CartStack';
import CategoryStack from './CategoryStack';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import Footer from '../components/Footer';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={props => <Footer {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Category" component={CategoryStack} />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
