import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './src/redux/store/configureStore';
import Routes from './src/routes/Routes';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <GestureHandlerRootView style={{flex: 1, backgroundColor: '#fff'}}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Routes />
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
