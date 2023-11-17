import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartMighzal from '../screens/CartMighzal';
import CheckOutMighzal from '../screens/CheckOutMighzal';
import ProductDetails from '../screens/ProductDetails';
import LoggedOutNavigator from './LoggedOutNavigator';
import AddressAddNewShipping from '../screens/AddressAddNewShipping';
import OrderSuccess from '../screens/OrderSuccess';

const CartStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="CartScreen" component={CartMighzal} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutMighzal} />
      <Stack.Screen name="ProductDetails-Cart" component={ProductDetails} />
      <Stack.Screen
        name="AddShippingAddressScreen-Cart"
        component={AddressAddNewShipping}
      />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
    </Stack.Navigator>
  );
};

export default CartStack;
