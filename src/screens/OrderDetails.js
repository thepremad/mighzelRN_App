/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../components/Header';

const OrderDetails = ({navigation, route}) => {
  const details = route.params?.item;
  let subTotal = 0;
  console.log(details);

  return (
    <View style={styles.container}>
      <Header navAction="back" title="" />
      <ScrollView contentContainerStyle={{paddingBottom: hp(1)}}>
        <Text style={styles.orderDetilText}>Order Details:</Text>
        <Text style={styles.orderText}>
          Order{' '}
          <Text style={{color: 'green', fontFamily: 'Roboto-Medium'}}>
            #{details?.order_number}
          </Text>{' '}
          was placed on{' '}
          <Text style={{color: 'orange', fontFamily: 'Roboto-Medium'}}>
            {details?.date_created}
          </Text>{' '}
          and it is currently processing
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
          <Text style={styles.productText}>Amount</Text>
        </View>

        {details?.line_items?.map((item, index) => {
          subTotal += Number(item?.subtotal);
          return (
            <View style={[styles.productTotalBox, {marginHorizontal: wp(2)}]}>
              <Text
                numberOfLines={1}
                style={[styles.productText, {flex: 1, marginRight: wp(5)}]}>
                {index + 1}. {item?.product_name}
              </Text>
              <Text style={styles.productText}>{item?.subtotal} KWD</Text>
            </View>
          );
        })}

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
            <Text style={styles.productText}>{subTotal} KWD</Text>
          </View>

          <View style={[[styles.productTotalBox]]}>
            <Text style={styles.productText}>Discount Total</Text>
            <Text style={styles.productText}>
              {details?.discount_total} KWD
            </Text>
          </View>

          <View style={[[styles.productTotalBox]]}>
            <Text style={styles.productText}>Shipping</Text>
            <Text style={styles.productText}>
              {details?.shipping_total} KWD
            </Text>
          </View>

          <View style={[styles.productTotalBox]}>
            <Text style={styles.productText}>Payment Method</Text>
            <Text style={styles.productText}>
              {details?.payment_method_title}
            </Text>
          </View>

          <View style={[styles.productTotalBox]}>
            <Text style={styles.productText}>Total</Text>
            <Text style={styles.productText}>{details?.total} KWD</Text>
          </View>
        </View>

        <Text style={styles.orderDetilText}>Billing Address:</Text>
        <View style={styles.BillingBox}>
          {Object.keys(details?.billing)?.map((key, index) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth:
                  index === Object.keys(details?.billing)?.length - 1 ? 0 : 3,
                borderColor: '#fff',
              }}>
              <Text
                style={[
                  styles.billingTexts,
                  {
                    textTransform: 'capitalize',
                    // borderWidth: 1,
                    flex: 1,
                    textAlignVertical: 'center',
                  },
                ]}>
                {key.replace('_', ' ')}
              </Text>
              <Text
                style={[
                  styles.billingTexts,
                  {
                    // borderWidth: 1,
                    flex: 1,
                    textAlignVertical: 'center',
                    alignSelf: 'flex-end',
                  },
                ]}>
                {details?.billing[key]}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    // height: hp(4),
    backgroundColor: '#f3f3f3',
    marginTop: hp(2),
    marginHorizontal: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  billingTexts: {
    fontSize: wp(4),
    marginVertical: hp(0.3),
  },
});
