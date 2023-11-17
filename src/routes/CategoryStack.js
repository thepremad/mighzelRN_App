import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from '../screens/Categories';
import CategoryProductList from '../screens/CategoryProductList';
import ProductDetails from '../screens/ProductDetails';

const CategoryStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CategoryScreen"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="CategoryScreen" component={Categories} />
      <Stack.Screen
        name="ProductList-Category"
        component={CategoryProductList}
      />
      <Stack.Screen name="ProductDetails-Category" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default CategoryStack;

const styles = StyleSheet.create({});
