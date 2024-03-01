import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Image} from '@rneui/base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// image
// import ima_rightArrow from '../asserts/Image/ima_rightArrow.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';

const DashboardInnerScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        navAction="back"
        title="Dashboard"
        titleStyle={{fontSize: wp(4), fontFamily: 'Montserrat-Light'}}
      />
      <View style={styles.homeContainer}>
        <Text
          style={{
            fontSize: wp(4),
            width: wp(45),
            marginLeft: wp(4),
            color: '#000',
            fontFamily: 'Montserrat-Light',
            marginTop: hp(3),
          }}>
          Hello hh@gmail.com not hh @gmail.com? Log Out
        </Text>
        <Text style={styles.fromYourText}>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </Text>
      </View>
    </View>
  );
};

export default DashboardInnerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
  },

  dashbordHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
    marginLeft: wp(4),
  },
  dashboardText: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp(4),
  },
  righArrowImage: {
    height: hp(3),
    width: wp(6),
  },
  fromYourText: {
    fontSize: wp(4.5),
    width: wp(85),
    marginLeft: wp(4),
    color: '#000',
    fontFamily: 'Montserrat-Light',
    marginTop: hp(6),
  },
});
