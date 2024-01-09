/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Button, Icon, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {makeRequest} from '../api/ApiInfo';
import {isValidEmail} from '../authentication/auth';
import {showSnack} from '../components/Snackbar';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleForgot = async () => {
    if (error) return;
    try {
      setLoader(true);
      makeRequest(`forget_password?email=${email}`).then(result => {
        const {Status, Message} = result;
        setLoader(false);
        showSnack(Message, null, !Status);
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
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
            zIndex: 99,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <ActivityIndicator color="#d68088" size={'large'} />
        </View>
      )}

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        style={{
          borderRadius: hp(10),
          padding: wp(1.5),
          marginLeft: wp(3),
          marginVertical: hp(1),
        }}>
        <AntDesign name="arrowleft" color="#d68088" size={wp(5)} />
      </TouchableOpacity>
      <View style={styles.homeContainer}>
        <Text style={styles.titleText}>Forgot Password</Text>
        <Text style={styles.descText}>
          Please enter your email address. You will {'\n'}receive a link to
          verify your account via {'\n'}email
        </Text>

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
              marginTop: hp(5),
            },
          ]}
          activeUnderlineColor="#d68088"
          onChangeText={text => setEmail(text)}
          onBlur={() => !isValidEmail(email) && setError(true)}
          onFocus={() => setError(false)}
          value={email}
        />

        {error && (
          <Text
            style={{
              color: 'red',
              fontSize: wp(2.8),
              fontFamily: 'Montserrat-Medium',
              marginTop: 5,
            }}>
            Please enter valid email!
          </Text>
        )}

        <Button
          onPress={handleForgot}
          disabled={!isValidEmail(email)}
          mode="elevated"
          buttonColor="#d68088"
          textColor="#fff"
          labelStyle={{
            fontSize: wp(4),
            fontFamily: 'Montserrat-SemiBold',
          }}
          style={{
            marginVertical: hp(7),
            borderRadius: 0,
          }}
          contentStyle={{
            height: hp(5.5),
          }}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
    marginTop: hp(10),
  },
  titleText: {
    fontSize: wp(5.5),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  descText: {
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Light',
    letterSpacing: 0.6,
  },
});
