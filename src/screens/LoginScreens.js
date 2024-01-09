/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// image
import {async_keys, getData, storeData} from '../storage/UserPreference';
import {isValidEmail} from '../authentication/auth';
import {ActivityIndicator, Button, Icon, TextInput} from 'react-native-paper';
import {BASE_URL, makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';
import {useDispatch} from 'react-redux';
import {setMainRoute} from '../redux/action/routeActions';
import PaymentUI from '../payment_gateway/PaymentUI';

// import RNGoSell from '@tap-payments/gosell-sdk-react-native';
// import sdkConfigurations from '../payment_gateway/sdkConfigurations';

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
    // RNGoSell.goSellSDK.startPayment(sdkConfigurations, 0, handleResult);
    await storeData(async_keys.skip_login_screen, true);

    if (route?.params?.back) {
      navigation.goBack();
    } else {
      dispatch(setMainRoute('Login'));
    }
  };

  // const handleResult = (error, status) => {
  //   var myString = JSON.stringify(status);
  //   console.log('status is ' + status.sdk_result);
  //   console.log(myString);
  //   var resultStr = String(status.sdk_result);
  //   switch (resultStr) {
  //     case 'SUCCESS':
  //       handleSDKResult(status);
  //       break;
  //     case 'FAILED':
  //       handleSDKResult(status);
  //       break;
  //     case 'SDK_ERROR':
  //       console.log('sdk error............');
  //       console.log(status['sdk_error_code']);
  //       console.log(status['sdk_error_message']);
  //       console.log(status['sdk_error_description']);
  //       console.log('sdk error............');
  //       break;
  //     case 'NOT_IMPLEMENTED':
  //       break;
  //   }
  // };

  // const handleSDKResult = result => {
  //   console.log('trx_mode::::');
  //   console.log(result['trx_mode']);
  //   switch (result['trx_mode']) {
  //     case 'CHARGE':
  //       console.log('Charge');
  //       console.log(result);
  //       printSDKResult(result);
  //       break;

  //     case 'AUTHORIZE':
  //       printSDKResult(result);
  //       break;

  //     case 'SAVE_CARD':
  //       printSDKResult(result);
  //       break;

  //     case 'TOKENIZE':
  //       Object.keys(result).map(key => {
  //         console.log(`TOKENIZE \t${key}:\t\t\t${result[key]}`);
  //       });

  //       // responseID = tapSDKResult['token'];
  //       break;
  //   }
  // };

  // const printSDKResult = result => {
  //   if (!result) return;
  //   Object.keys(result).map(key => {
  //     console.log(`${result['trx_mode']}\t${key}:\t\t\t${result[key]}`);
  //   });
  // };

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
            zIndex: 99,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <ActivityIndicator color="#d68088" size={'large'} />
        </View>
      )}

      <Text
        disabled={route?.params?.back}
        onPress={handleSkip}
        style={{fontSize: wp(4), color: '#555', margin: wp(3)}}>
        {route?.params?.back ? '' : 'Skip'}
      </Text>

      <View style={styles.homeContainer}>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          inputMode="email"
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

        <Button
          mode="text"
          textColor="#fff"
          labelStyle={styles.forgetPasswordText}
          // style={styles.loginButtonBox}
          style={{
            alignSelf: 'flex-end',
            marginVertical: hp(1),
          }}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Button>

        {/* <RectButton onPress={handleLogin} style={styles.loginButtonBox}>
          <Text style={styles.loginButtonText}>Login</Text>
        </RectButton> */}

        <Button
          mode="text"
          buttonColor="#d68088"
          textColor="#fff"
          labelStyle={{
            fontSize: wp(4),
            fontFamily: 'Montserrat-SemiBold',
          }}
          style={styles.loginButtonBox}
          contentStyle={{
            height: hp(6),
          }}
          // icon={() =>
          //   !loader && <ActivityIndicator size="small" color="#fff" />
          // }
          // loading={true}
          onPress={handleLogin}>
          Login
        </Button>

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
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: hp(5),
    marginBottom: hp(10),
  },

  forgetPasswordText: {
    fontSize: wp(4),
    color: '#3a3a3a',
    fontFamily: 'Montserrat-Medium',
  },

  loginButtonBox: {
    backgroundColor: '#cf8385',
    marginHorizontal: wp(8),
    marginTop: hp(5),
    elevation: 5,
    borderRadius: 0,
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
