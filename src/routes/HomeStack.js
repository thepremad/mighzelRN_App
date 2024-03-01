import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductList-Home" component={ProductList} />
      <Stack.Screen name="ProductDetails-Home" component={ProductDetails} />
      <Stack.Screen name="SearchScreen-Home" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
