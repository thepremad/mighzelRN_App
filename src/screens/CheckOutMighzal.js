/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {ActivityIndicator, RadioButton} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {async_keys, getData} from '../storage/UserPreference';
import {showSnack} from '../components/Snackbar';
import {makeRequest} from '../api/ApiInfo';
import {fetchCartDataSuccess} from '../redux/action/cartActions';
import PaymentUI from '../payment_gateway/PaymentUI';

const CheckOutMighzal = ({navigation, route}) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [loader, setLoader] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);

  const dispatch = useDispatch();
  const {cartData, isLoading, error} = useSelector(state => state.cart);
  const {billing_address} = cartData;

  console.log('cartData', cartData);

  const handleSubmit = async startPayment => {
    try {
      if (Object.keys(billing_address).length === 0) {
        showSnack('Please add billing address', null, true);
        return true;
      }

      if (!selectedAddress) {
        showSnack('Please select billing address', null, true);
        return true;
      }

      if (!selectedPayment) {
        showSnack('Please select payment option', null, true);
        return true;
      }

      if (selectedPayment === 'cash') {
        createOrder();
      } else {
        startPayment(createOrder, setLoader);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      setLoader(true);
      const token = await getData(async_keys.auth_token);
      const customer_id = await getData(async_keys.customer_id);
      const coupon_code = route?.params?.couponCode || '';

      const update = {
        ...cartData,
        items: [],
        coupons: [],
        fees: [],
        totals: {
          total_price: 0,
          total_discount: 0,
        },
        items_count: 0,
      };

      const params = {
        token,
        customer_id,
      };
      if (coupon_code) {
        params.coupon_code = coupon_code;
      }

      const res = await makeRequest(`create_order`, params, true);
      if (res) {
        const {Status, Message} = res;
        if (Status === true) {
          showSnack(Message);
          dispatch(fetchCartDataSuccess(update));
          setLoader(false);
          navigation.navigate('OrderSuccess', {data: res.Data});
        } else {
          setLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Checkout" navAction="back" />
      {loader && (
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            height: hp(100),
            width: wp(100),
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#D68088" />
        </View>
      )}

      <ScrollView style={{margin: hp(0.8)}}>
        <Text
          style={{
            color: '#000000',
            fontFamily: 'Roboto-Medium',
            margin: hp(1),
            fontSize: wp(4.5),
          }}>
          Additional Information
        </Text>

        <Text
          style={{
            color: '#000000',
            fontFamily: 'Roboto-Light',
            marginHorizontal: hp(1),
            marginBottom: hp(0.5),
            marginTop: hp(1.5),
          }}>
          ADD A NOTE TO YOUR ORDER (OPTIONAL)
        </Text>

        <TextInput
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: hp(0.5),
            elevation: 3,
          }}
        />

        <View
          style={{
            marginVertical: hp(3),
            backgroundColor: '#fff',
            elevation: 3,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: wp(5),
              fontFamily: 'Roboto-Medium',
              color: '#000000',
              marginVertical: hp(1),
            }}>
            Your Order
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(1),
              justifyContent: 'space-between',
              marginHorizontal: wp(2.5),
            }}>
            <Text style={{color: '#000000', fontSize: wp(4)}}>Order</Text>
            <Text style={{color: '#000000', fontSize: wp(4)}}>
              {route?.params?.total_price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(1),
              justifyContent: 'space-between',
              marginHorizontal: wp(2.5),
            }}>
            <Text style={{color: '#000000', fontSize: wp(4)}}>Delivery</Text>
            <Text style={{color: '#000000', fontSize: wp(4)}}>
              {/* {cartData?.totals?.total_discount} */}0
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(1),
              justifyContent: 'space-between',
              marginHorizontal: wp(2.5),
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: wp(4),
                fontFamily: 'Roboto-Medium',
              }}>
              Summary
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: wp(4),
                fontFamily: 'Roboto-Medium',
              }}>
              {route?.params?.total_price}
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff', elevation: 5}}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Roboto-Medium',
              marginVertical: hp(1.2),
              fontSize: wp(4),
              marginHorizontal: wp(2.5),
            }}>
            Billing address
          </Text>
        </View>

        <RectButton
          onPress={() => navigation.navigate('AddShippingAddressScreen-Cart')}
          rippleColor={'#B04F58'}
          style={{
            height: hp(5),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: wp(4),
            marginVertical: hp(2.5),
            borderRadius: wp(1.5),
            backgroundColor: '#d68088',
            elevation: 5,
          }}>
          <Text
            style={{
              fontSize: wp(4.5),
              fontFamily: 'Roboto-Medium',
              color: '#fff',
            }}>
            Add Billing Address
          </Text>
        </RectButton>

        {billing_address && (
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: hp(3),
              elevation: 3,
              paddingLeft: wp(10),
              paddingVertical: hp(2),
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Light',
                fontSize: wp(4.2),
              }}>
              {billing_address?.first_name}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Light',
                fontSize: wp(4.2),
              }}>
              {billing_address?.address_1}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Light',
                fontSize: wp(4.2),
              }}>
              {billing_address?.address_2}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(2),
              }}>
              <RadioButton
                uncheckedColor="#999"
                color="#d68088"
                value={selectedAddress}
                status={selectedAddress ? 'checked' : 'unchecked'}
                onPress={() => setSelectedAddress(!selectedAddress)}
              />
              <Text
                style={[
                  styles.radioButtonText,
                  {fontFamily: 'Roboto-Regular'},
                ]}>
                Select as a shippping address
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: hp(3),
            elevation: 3,
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Roboto-Medium',
              marginTop: hp(1.2),
              fontSize: wp(4),
              marginHorizontal: wp(2.5),
            }}>
            Payment
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(3),
              alignItems: 'center',
            }}>
            <View style={{marginLeft: wp(10)}}>
              <RadioButton
                uncheckedColor="#999"
                color="#d68088"
                value={selectedPayment}
                status={selectedPayment === 'cash' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedPayment('cash')}
              />
            </View>
            <Text style={styles.radioButtonText}>
              Cash on delivery (kumait only)
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(3),
              alignItems: 'center',
            }}>
            <View style={{marginLeft: wp(10)}}>
              <RadioButton
                uncheckedColor="#999"
                color="#d68088"
                value={selectedPayment}
                status={
                  selectedPayment === 'debit_credit' ? 'checked' : 'unchecked'
                }
                onPress={() => setSelectedPayment('debit_credit')}
              />
            </View>
            <Text style={styles.radioButtonText}>
              Pay by Debit/Credit card only
            </Text>
          </View>
        </View>

        <PaymentUI
          amount={route?.params?.total_price}
          handleSubmit={handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default CheckOutMighzal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  radiobuttonImage: {
    height: wp(7),
    aspectRatio: 1 / 1,
  },

  radioButtonText: {
    alignSelf: 'center',
    fontSize: wp(4.2),
    fontFamily: 'Roboto-Light',
    color: '#000000',
    marginLeft: wp(8),
  },
});
