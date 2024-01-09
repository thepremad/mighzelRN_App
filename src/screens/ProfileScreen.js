/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {Image} from '@rneui/base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  async_keys,
  clearData,
  getData,
  removeItem,
} from '../storage/UserPreference';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setMainRoute} from '../redux/action/routeActions';
import {fetchOrderDataRequest} from '../redux/action/orderActions';
import {fetchCartDataRequest} from '../redux/action/cartActions';

// icon
// import ic_rightArrow from '../asserts/Image/ic_rightArrow.png';

const ProfileScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loader, setLoader] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    let timeOutId;
    if (isFocused) {
      setLoader(true);
      authenticate();
      timeOutId = setTimeout(() => {
        setLoader(false);
      }, 1000);
    }

    return () => clearTimeout(timeOutId);
  }, [isFocused]);

  useEffect(() => {
    fetchName();
  }, []);
  const fetchName = async () => {
    const name = await getData(async_keys.user_display_name);
    setDisplayName(name);
  };

  const authenticate = async () => {
    const auth = await getData(async_keys.auth_token);
    setIsLogin(auth || false);
    // setLoader(false);
  };

  const handleLogin = async screen => {
    await removeItem(async_keys.skip_login_screen);
    navigation.navigate('Logout', {
      screen,
      params: {back: true},
    });
  };

  const handleLogout = async () => {
    await clearData();
    dispatch(setMainRoute('Logout'));
  };

  if (loader) {
    return (
      <View
        style={{
          position: 'absolute',
          height: hp(100),
          width: wp(100),
          justifyContent: 'center',
          zIndex: 9,
        }}>
        <ActivityIndicator color="#d68088" size={'large'} />
      </View>
    );
  }

  return !isLogin ? (
    <>
      <RectButton
        onPress={() => handleLogin('LoginScreen')}
        style={styles.loginButtonBox}>
        <Text style={styles.loginButtonText}>Login</Text>
      </RectButton>

      <RectButton
        onPress={() => handleLogin('SignUpScreen')}
        style={[styles.loginButtonBox, {marginTop: hp(4)}]}>
        <Text style={styles.loginButtonText}>Register</Text>
      </RectButton>
    </>
  ) : (
    <View>
      <View style={styles.dashboardBox}>
        <Text
          style={{
            fontSize: wp(7),
            color: '#000',
            marginLeft: wp(4),
            marginTop: hp(2),
            textTransform: 'capitalize',
          }}>
          Hello, {displayName}
        </Text>
        <Text style={styles.myAccountText}>MY ACCOUNT</Text>
        <TouchableOpacity
          onPress={() => alert('hii')}
          style={[styles.dasOrImageBox, {marginTop: hp(3.5)}]}>
          <Text style={styles.dashboardText}>Dashboard</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>

        <View style={styles.lineBox} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OrderScreen');
            dispatch(fetchOrderDataRequest());
          }}
          style={[styles.dasOrImageBox]}>
          <Text style={styles.dashboardText}>My Order</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={[styles.lineBox]} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddShippingAddressScreen');
          }}
          style={[styles.dasOrImageBox]}>
          <Text style={styles.dashboardText}>Address</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={styles.lineBox} />

        <TouchableOpacity style={[styles.dasOrImageBox]}>
          <Text style={styles.dashboardText}>Account Details</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={styles.lineBox} />

        <TouchableOpacity style={[styles.dasOrImageBox]}>
          <Text style={styles.dashboardText}>Delete My Account</Text>
          <AntDesign name="right" color="#999" size={wp(5)} />
        </TouchableOpacity>
        <View style={styles.lineBox} />

        <TouchableHighlight
          underlayColor="#d4d4d4"
          onPress={handleLogout}
          style={{
            alignSelf: 'flex-start',
            marginLeft: wp(5),
            marginTop: hp(3),
          }}>
          <Text style={styles.logOutText}>Logout</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  homeContainer: {
    flex: 1,
  },

  myAccountText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Rgular',
    marginTop: hp(4),
    marginLeft: wp(4),
  },

  dasOrImageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    paddingVertical: hp(3),
  },
  dashboardText: {
    fontSize: wp(4.2),
    fontFamily: 'Montserrat-Rgular',
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
  },

  logOutText: {
    fontSize: wp(4.2),
    color: '#a4a4a4',
    fontFamily: 'Montserrat-Rgular',
    // marginTop: hp(-1),
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
