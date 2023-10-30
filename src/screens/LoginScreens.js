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
import {async_keys, storeData} from '../storage/UserPreference';
import {CommonActions} from '@react-navigation/native';
import {isValidEmail} from '../authentication/auth';
import CustomSnack from '../components/CustomSnack';
import {ActivityIndicator, Icon, TextInput} from 'react-native-paper';
import {makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';

const LoginScreens = ({navigation}) => {
  // using state
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [snackText, setSnackText] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleInputs = (value, key) => {
    setInputs({...inputs, [key]: value});
  };

  const handleSkip = async () => {
    await storeData(async_keys.skip_login_screen, true);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'LoginNavigator'}],
      }),
    );
  };

  const handleLogin = async () => {
    const {email, password} = inputs;

    console.log(!isValidEmail(email));

    if (!isValidEmail(email)) {
      showSnack('Please enter valid email!', null, true);

      return true;
    }

    if (password.trim() === '') {
      showSnack('Please enter your password!', null, true);

      return true;
    }

    try {
      setLoader(true);
      const params = {username: email, password};
      const result = await makeRequest(`login`, params, true);
      if (result) {
        const {Status, Message} = result;
        if (Status === true) {
          const {Data} = result;
          await storeData(async_keys.auth_token, Data.token);
          await storeData(async_keys.user_display_name, Data.user_display_name);
          showSnack(Message);

          setInputs({
            fullName: '',
            email: '',
            password: '',
          });
          setLoader(false);

          handleSkip();
        } else {
          setLoader(false);
          showSnack(Message, null, true);
        }
      }
    } catch (error) {
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
        Skip
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

        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Forgot Password</Text>
        </TouchableOpacity>

        <RectButton onPress={handleLogin} style={styles.loginButtonBox}>
          <Text style={styles.loginButtonText}>Login</Text>
        </RectButton>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
    fontWeight: '600',
    marginVertical: hp(5),
    marginBottom: hp(10),
  },

  forgetPasswordText: {
    fontSize: wp(4),
    color: '#3a3a3a',
    fontWeight: '500',
    textAlign: 'right',
    marginRight: wp(4),
    marginVertical: hp(1),
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
    fontWeight: '500',
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
