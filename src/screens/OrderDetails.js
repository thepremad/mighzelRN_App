/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../components/Header';

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <Header navAction="back" title="" />
      <Text style={styles.orderDetilText}>Order Details:</Text>
      <Text style={styles.orderText}>
        Order was placed on 2023-09-18T06:27:00 and it is currently processing
      </Text>

      <View
        style={[
          styles.productTotalBox,
          {
            backgroundColor: '#f3f3f3',
            marginTop: hp(2),
            marginHorizontal: wp(2),
          },
        ]}>
        <Text style={styles.productText}>Product</Text>
        <Text style={styles.productText}>Total</Text>
      </View>

      <View style={[styles.productTotalBox, {marginHorizontal: wp(2)}]}>
        <Text style={styles.productText}>Ela Ring</Text>
        <Text style={styles.productText}>18 KWD</Text>
      </View>

      <View
        style={[
          {
            backgroundColor: '#f3f3f3',
            marginTop: hp(1),
            marginHorizontal: wp(2),
          },
        ]}>
        <View style={[styles.productTotalBox]}>
          <Text style={styles.productText}>SubTotal</Text>
          <Text style={styles.productText}>0.00</Text>
        </View>

        <View style={[[styles.productTotalBox]]}>
          <Text style={styles.productText}>Shipping</Text>
          <Text style={styles.productText}>0.00</Text>
        </View>

        <View style={[styles.productTotalBox]}>
          <Text style={styles.productText}>Payment Method</Text>
          {/* <Text style={styles.productText}>0.00</Text> */}
        </View>

        <View style={[styles.productTotalBox]}>
          <Text style={styles.productText}>Total</Text>
          <Text style={styles.productText}>0.00</Text>
        </View>
      </View>

      <Text style={styles.orderDetilText}>Billing Address:</Text>
      <View style={styles.BillingBox} />
    </View>
  );
};

export default OrderDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderDetilText: {
    fontSize: wp(4),
    color: '#d68088',
    fontFamily: 'Roboto-Bold',
    marginTop: hp(4),
    marginLeft: wp(2),
  },

  orderText: {
    fontSize: wp(4),
    color: '#000',
    marginTop: hp(4),
    marginLeft: wp(2),
  },

  productTotalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: hp(1),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },

  productText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },

  BillingBox: {
    height: hp(4),
    backgroundColor: '#f3f3f3',
    marginTop: hp(2),
    marginHorizontal: wp(2),
  },
});
