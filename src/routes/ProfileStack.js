import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardInnerScreen from '../screens/DashboardInnerScreen';
import OrderTabScreen from '../screens/OrderTabScreen';
import Address from '../screens/Address';
import AddressAddNewShipping from '../screens/AddressAddNewShipping';
import OrderDetails from '../screens/OrderDetails';
import LoggedOutNavigator from './LoggedOutNavigator';

const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DashBoardScreen" component={DashboardInnerScreen} />
      <Stack.Screen name="OrderScreen" component={OrderTabScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetails} />
      <Stack.Screen name="AddressScreen" component={Address} />
      <Stack.Screen
        name="AddShippingAddressScreen"
        component={AddressAddNewShipping}
      />
      {/* <Stack.Screen
        name="LogoutNavigator-Profile"
        component={LoggedOutNavigator}
      /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
