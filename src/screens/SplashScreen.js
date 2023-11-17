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
import {setMainRoute} from '../redux/action/routeActions';
import {async_keys, getData} from '../storage/UserPreference';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      authenticate();
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, []);

  const authenticate = async () => {
    const skip = await getData(async_keys.skip_login_screen);
    if (skip) {
      dispatch(setMainRoute('Login'));
    } else {
      dispatch(setMainRoute('Logout'));
    }
  };

  useEffect(() => {
    dispatch(fetchHomeDataFirstRequest());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
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
    // height: '100%',
    // width: '100%',
    flex: 1,
  },
});
