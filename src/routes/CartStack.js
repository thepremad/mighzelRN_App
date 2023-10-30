import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartMighzal from '../screens/CartMighzal';
import CheckOutMighzal from '../screens/CheckOutMighzal';
import ProductDetails from '../screens/ProductDetails';

const CartStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CartScreen" component={CartMighzal} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutMighzal} />
      <Stack.Screen name="ProductDetails-Cart" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default CartStack;
