/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Fontisto from 'react-native-vector-icons/Fontisto';

// image
import ic_email from '../assets/icons/ic_email.png';
import ic_password from '../assets/icons/ic_password.png';
import {RectButton} from 'react-native-gesture-handler';
import {async_keys, getData, storeData} from '../storage/UserPreference';
import {CommonActions} from '@react-navigation/native';
import {isValidEmail} from '../authentication/auth';
import CustomSnack from '../components/CustomSnack';
import {ActivityIndicator, Icon, TextInput} from 'react-native-paper';
import {BASE_URL, makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';
import {useDispatch} from 'react-redux';
import {setMainRoute} from '../redux/action/routeActions';

const LoginScreens = ({navigation, route}) => {
  // console.log('route', route);
  // using state
  const [loader, setLoader] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleInputs = (value, key) => {
    setInputs({...inputs, [key]: value});
  };

  const handleSkip = async () => {
    await storeData(async_keys.skip_login_screen, true);

    if (!route?.params?.back) {
      navigation.goBack();
    } else {
      dispatch(setMainRoute('Login'));
    }
  };

  const addingInCart = async token => {
    let isSuccess;
    try {
      const cartData = await getData(async_keys.cart_data);
      if (cartData && cartData.length !== 0) {
        const params = cartData?.items?.map(({product_id, quantity}) => ({
          product_id,
          quantity,
        }));
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var raw = JSON.stringify(params);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        const resp = await fetch(
          `${BASE_URL}add_to_cart_all?token=${token}`,
          requestOptions,
        );
        const result = await resp.json();
        console.log(`add_to_cart_all`, {result, requestOptions});
        if (result) {
          //LOADER
          setLoader(false);
          const {Status, Message} = result;
          isSuccess = Status;
        }
      } else {
        setLoader(false);
        isSuccess = true;
      }
    } catch (error) {
      setLoader(false);
      isSuccess = false;
      console.log('addingInCart', error);
    }
    return isSuccess;
  };

  const handleLogin = async () => {
    const {email, password} = inputs;

    if (!isValidEmail(email)) {
      showSnack('Please enter valid email!', null, true);

      return true;
    }

    if (password.trim() === '') {
      showSnack('Please enter your password!', null, true);

      return true;
    }

    try {
      //LOADER
      setLoader(true);

      const params = {username: email, password};
      const result = await makeRequest(`login`, params, true);
      if (result) {
        const {Status, Message} = result;
        if (Status === true) {
          console.log(`login-resp`, result);
          const {Data} = result;
          await storeData(async_keys.auth_token, Data.token);
          await storeData(async_keys.user_display_name, Data.user_display_name);
          await storeData(async_keys.customer_id, Data.customer_id);

          const successfully_added = await addingInCart(Data.token);

          if (successfully_added) {
            handleSkip();
            setInputs({
              fullName: '',
              email: '',
              password: '',
            });
          } else {
            showSnack(`Something went wrong please login again`, null, true);
          }
        } else {
          //LOADER
          setLoader(false);
          showSnack(Message, null, true);
        }
      }
    } catch (error) {
      setLoader(false);
      console.log('handleLogin()', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      {loader && (
        <View
          style={{
            position: 'absolute',
            height: hp(100),
            width: wp(100),
            zIndex: 9,
          }}>
          <ActivityIndicator color="#d68088" size={'large'} />
        </View>
      )}

      <Text
        onPress={handleSkip}
        style={{fontSize: wp(4), color: '#555', margin: wp(3)}}>
        {route?.params?.back ? '' : 'Skip'}
      </Text>

      <View style={styles.homeContainer}>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          mode="flat"
          label=""
          placeholder="Enter Email"
          left={
            <TextInput.Icon
              icon={({}) => (
                <Icon source="email-outline" color="#d68088" size={wp(5)} />
              )}
            />
          }
          style={[
            {
              backgroundColor: 'transparent',
              marginHorizontal: wp(2),
            },
          ]}
          underlineColor="#999"
          activeUnderlineColor="#d68088"
          onChangeText={text => handleInputs(text, 'email')}
          value={inputs.email}
        />

        <TextInput
          mode="flat"
          label=""
          placeholder="Enter Password"
          left={
            <TextInput.Icon
              icon={({}) => <Icon source="lock" color="#d68088" size={wp(5)} />}
            />
          }
          style={[
            {
              backgroundColor: 'transparent',
              marginHorizontal: wp(2),
              marginTop: hp(3),
            },
          ]}
          // underlineStyle={{borderBottomWidth: 1}}
          activeUnderlineColor="#d68088"
          onChangeText={text => handleInputs(text, 'password')}
          value={inputs.password}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginVertical: hp(1),
            marginRight: wp(2),
          }}>
          <Text style={styles.forgetPasswordText}>Forgot Password</Text>
        </TouchableOpacity>

        <RectButton onPress={handleLogin} style={styles.loginButtonBox}>
          <Text style={styles.loginButtonText}>Login</Text>
        </RectButton>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.registerHereText}>Register here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastBox} />
    </View>
  );
};

export default LoginScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
  },
  loginText: {
    fontSize: wp(6),
    color: '#000',
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
    marginVertical: hp(5),
    marginBottom: hp(10),
  },

  forgetPasswordText: {
    fontSize: wp(4),
    color: '#3a3a3a',
    fontFamily: 'Roboto-Medium',
  },

  loginButtonBox: {
    backgroundColor: '#cf8385',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(8),
    marginTop: hp(5),
    elevation: 5,
  },

  loginButtonText: {
    fontSize: wp(4),
    color: '#fff',
    paddingVertical: hp(1.5),
    fontFamily: 'Roboto-Medium',
  },

  registerHereText: {
    fontSize: wp(4),
    color: '#222222',
    alignSelf: 'center',
    marginTop: hp(2),
  },

  lastBox: {
    height: hp(6),
    backgroundColor: '#cf8385',
  },
});
