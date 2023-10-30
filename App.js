/* eslint-disable react/no-unstable-nested-components */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './src/redux/store/configureStore';
import {async_keys, getData, storeData} from './src/storage/UserPreference';
import Routes from './src/routes/Routes';
import TabNavigator from './src/routes/TabNavigator';
import SplashScreen from './src/screens/SplashScreen';
import LoggedOutNavigator from './src/routes/LoggedOutNavigator';

const App = () => {
  const [closeSplash, setCloseSplash] = useState(false);
  const [skipLogin, setSkipLogin] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setCloseSplash(true);
    }, 2000);

    authenticate();

    return () => clearTimeout(timeOutId);
  }, []);

  const authenticate = async () => {
    const skip = await getData(async_keys.skip_login_screen);
    console.log('auth', skip);
    setSkipLogin(skip);
  };

  const Stack = createNativeStackNavigator();

  const AppContainer = () =>
    !closeSplash ? (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    ) : skipLogin ? (
      <TabNavigator />
    ) : (
      <Stack.Navigator
        initialRouteName="LogoutNavigator"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LogoutNavigator" component={LoggedOutNavigator} />
        <Stack.Screen name="LoginNavigator" component={TabNavigator} />
      </Stack.Navigator>
    );

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <GestureHandlerRootView style={{flex: 1, backgroundColor: '#fff'}}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppContainer />
                <FlashMessage position="top" />
              </PersistGate>
            </Provider>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
