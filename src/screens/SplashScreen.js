import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

import img_splash from '../assets/images/splash_image.jpeg';
import {fetchHomeDataFirstRequest} from '../redux/action/homeActions';

const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeDataFirstRequest());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        showHideTransition={'fade'}
        hidden
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Image
        source={img_splash}
        style={styles.imageBackground}
        resizeMode="stretch"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    height: '100%',
    width: '100%',
  },
});
