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
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

import img_splash from '../assets/images/splash_jpg.jpg';
// import img_splash from '../assets/images/splash_image.jpeg';
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
    console.log('skip', skip);
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
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={{flex: 1}}>
        <FastImage
          source={img_splash}
          style={styles.imageBackground}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    ...StyleSheet.absoluteFill,
  },

  imageBackground: {
    // height: hp(50),
    // width: wp(50),
    // margin: 5,
    // // flex: 1,
    flex: 1,
  },
});
