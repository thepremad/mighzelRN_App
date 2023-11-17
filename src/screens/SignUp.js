/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// image
import ic_email from '../assets/icons/ic_email.png';
import ic_user from '../assets/icons/ic_user.png';
import ic_email1 from '../assets/icons/ic_email1.png';
import ic_password from '../assets/icons/ic_password.png';
import {RectButton} from 'react-native-gesture-handler';
import {isValidEmail} from '../authentication/auth';
import {ActivityIndicator, Button, Icon, Snackbar} from 'react-native-paper';
import CustomSnack from '../components/CustomSnack';
import {makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';

const SignUp = ({navigation}) => {
  //using state
  const [loader, setLoader] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputs = (value, key) => {
    setInputs({...inputs, [key]: value});
  };

  const handleSignUp = async () => {
    const {fullName, email, password} = inputs;

    //VALIDATION
    if (fullName.trim() === '' || fullName.length < 3) {
      showSnack('Full name should be minimum 3 character long!', null, true);

      return true;
    }

    if (!isValidEmail(email)) {
      showSnack('Please enter valid email!', null, true);
      return true;
    }

    if (password.trim() === '' || fullName.length < 3) {
      showSnack('Password should be minimum 3 character long!', null, true);
      return true;
    }

    try {
      //PREPARING PARAMS
      const params = {
        email,
        first_name: fullName,
        // last_name:'',
        password,
      };
      //API CALLING
      setLoader(true);
      const result = await makeRequest(`register_user`, params, true);

      if (result) {
        setLoader(false);
        const {Status, Message} = result;
        if (Status === true) {
          setSnackText(Message);
          setVisible(true);
          setError(false);
          setInputs({
            fullName: '',
            email: '',
            password: '',
          });

          navigation.navigate('LoginScreen');
        } else {
          setSnackText(Message);
          setVisible(true);
          setError(true);
        }
      }
    } catch (error) {
      console.log('handleSignUp()', error);
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.homeContainer}>
        <Text style={styles.registerText}>Register</Text>

        <Text style={styles.nameText}>Name</Text>

        <View style={[styles.emailTextInputBox, {marginTop: hp(2)}]}>
          <Image source={ic_user} style={{height: hp(3), width: wp(6)}} />
          <TextInput
            placeholder="Enter Full Name "
            placeholderTextColor={'#7a7a7a'}
            style={styles.emailTextInput}
            onChangeText={text => handleInputs(text, 'fullName')}
            value={inputs.fullName}
          />
        </View>
        <View
          style={{
            height: hp(0.2),
            backgroundColor: '#d4d4d4',
            marginHorizontal: wp(4),
          }}
        />

        <Text style={styles.nameText}>Email</Text>
        <View style={[styles.emailTextInputBox, {marginTop: hp(2)}]}>
          <Image source={ic_email1} style={{height: hp(3), width: wp(6)}} />
          <TextInput
            placeholder="Enter Email "
            placeholderTextColor={'#7a7a7a'}
            style={styles.emailTextInput}
            onChangeText={text => handleInputs(text, 'email')}
            value={inputs.email}
          />
        </View>
        <View
          style={{
            height: hp(0.2),
            backgroundColor: '#d4d4d4',
            marginHorizontal: wp(4),
          }}
        />

        <Text style={styles.nameText}>Password</Text>
        <View style={[styles.emailTextInputBox, {marginTop: hp(2)}]}>
          <Image source={ic_password} style={{height: hp(3), width: wp(6)}} />
          <TextInput
            placeholder="Enter Password "
            placeholderTextColor={'#7a7a7a'}
            style={styles.emailTextInput}
            onChangeText={text => handleInputs(text, 'password')}
            value={inputs.password}
          />
        </View>
        <View
          style={{
            height: hp(0.2),
            backgroundColor: '#d4d4d4',
            marginHorizontal: wp(4),
          }}
        />

        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.alreadyRegisterText}>
          Already register? Login
        </Text>

        <RectButton onPress={handleSignUp} style={styles.loginButtonBox}>
          <Text style={styles.loginButtonText}>Register</Text>
        </RectButton>
      </View>

      <View style={styles.lastBox} />
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {flex: 1},
  registerText: {
    fontSize: wp(7),
    color: '#000',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    marginTop: hp(10),
  },

  nameText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Roboto-Regular',
    marginTop: hp(2),
    marginLeft: wp(2),
  },

  emailTextInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(8),
  },

  emailTextInput: {
    marginLeft: wp(2),
  },

  alreadyRegisterText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Roboto-Medium',
    textAlign: 'right',
    marginRight: wp(4),
    marginTop: hp(1.5),
  },

  loginButtonBox: {
    backgroundColor: '#d68088',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(6.2),
  },

  loginButtonText: {
    fontSize: wp(4),
    color: '#fff',
    paddingVertical: hp(2),
    fontFamily: 'Roboto-Medium',
  },

  lastBox: {
    height: hp(5),
    backgroundColor: '#d68088',
  },
});
