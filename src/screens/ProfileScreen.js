/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from '@rneui/base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {async_keys, clearData, getData} from '../storage/UserPreference';
import {CommonActions} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

// icon
// import ic_rightArrow from '../asserts/Image/ic_rightArrow.png';

const ProfileScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    authenticate();
    const timeOutId = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, []);

  const authenticate = async () => {
    const auth = await getData(async_keys.auth_token);
    setIsLogin(auth || false);
    // setLoader(false);
  };

  const handleLogin = async () => {
    await clearData();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'LogoutNavigator'}],
      }),
    );
  };

  if (loader) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 10,
          height: hp(100),
          width: wp(100),
          zIndex: 9,
        }}>
        <ActivityIndicator color="#d68088" size={'large'} />
      </View>
    );
  }

  return !isLogin ? (
    <>
      <RectButton onPress={handleLogin} style={styles.loginButtonBox}>
        <Text style={styles.loginButtonText}>Login</Text>
      </RectButton>

      <RectButton style={[styles.loginButtonBox, {marginTop: hp(4)}]}>
        <Text style={styles.loginButtonText}>Register</Text>
      </RectButton>
    </>
  ) : (
    <View>
      <View style={styles.dashboardBox}>
        <Text
          style={{
            fontSize: wp(4),
            color: '#000',
            marginLeft: wp(4),
            marginTop: hp(2),
          }}>
          Hello ghh
        </Text>
        <Text style={styles.myAccountText}>MY ACCOUNT</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DashBoardScreen')}
          style={[styles.dasOrImageBox, {marginTop: hp(3.5)}]}>
          <Text style={styles.dashboardText}>Dashboard</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>

        <View style={styles.lineBox} />

        <TouchableOpacity
          onPress={() => navigation.navigate('OrderScreen')}
          style={[styles.dasOrImageBox, {marginTop: hp(-1)}]}>
          <Text style={styles.dashboardText}>My Order</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={[styles.lineBox, {marginTop: hp(3)}]} />

        <TouchableOpacity
          onPress={() => navigation.navigate('AddressScreen')}
          style={[styles.dasOrImageBox, {marginTop: hp(-1)}]}>
          <Text style={styles.dashboardText}>Address</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={styles.lineBox} />

        <TouchableOpacity style={[styles.dasOrImageBox, {marginTop: hp(-1)}]}>
          <Text style={styles.dashboardText}>Account Details</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={styles.lineBox} />

        <TouchableOpacity style={[styles.dasOrImageBox, {marginTop: hp(-1)}]}>
          <Text style={styles.dashboardText}>Delete My Account</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={styles.lineBox} />

        <Text style={styles.logOutText}>LogOut</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  homeContainer: {
    flex: 1,
  },

  myAccountText: {
    fontSize: wp(5),
    color: '#000',
    fontWeight: '400',
    marginTop: hp(4),
    marginLeft: wp(4),
  },

  dasOrImageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    // marginTop: hp(4),
  },
  dashboardText: {
    fontSize: wp(4.2),
    fontWeight: '400',
    color: '#a4a4a4',
    marginLeft: wp(1),
  },

  rightArrowImage: {
    height: hp(5),
    width: wp(5),
  },

  lineBox: {
    height: hp(0.1),
    marginHorizontal: wp(4),
    backgroundColor: '#a4a4a4',
    marginVertical: hp(3),
  },

  logOutText: {
    fontSize: wp(5),
    color: '#999',
    marginLeft: wp(5),
    fontWeight: '500',
    marginTop: hp(-1),
  },

  loginButtonBox: {
    backgroundColor: '#cf8385',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(8),
    marginTop: hp(8),
    borderRadius: wp(1),
    elevation: 5,
  },
  loginButtonText: {
    fontSize: wp(4),
    color: '#fff',
    paddingVertical: hp(2),
    fontWeight: '500',
  },
});
