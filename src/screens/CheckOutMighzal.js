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
import {fetchUserDataRequest} from '../redux/action/userActions';

const CheckOutMighzal = ({navigation, route}) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const {cartData, error} = useSelector(state => state.cart);
  const {billing_address, shipping_address} = cartData;

  // console.log('cart-checkout', cartData);
  // const {userData, isLoading} = useSelector(state => state.user);

  // useEffect(() => {
  //   dispatch(fetchUserDataRequest());
  // }, [dispatch]);

  const handleSubmit = async startPayment => {
    try {
      if (selectedAddress !== 2) {
        if (Object.keys(shipping_address).length === 0) {
          showSnack('Please add billing address', null, true);
          return true;
        }
      }

      if (selectedAddress !== 1) {
        if (Object.keys(billing_address).length === 0) {
          showSnack('Please add shipping address', null, true);
          return true;
        }
      }

      if (!selectedPayment) {
        showSnack('Please select payment option', null, true);
        return true;
      }

      if (selectedPayment === 'cod') {
        createOrder();
      } else {
        startPayment(createOrder, setLoader);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const createOrder = async paymentStatus => {
    console.log('paymentStatus', paymentStatus);
    // OUTPUT IS:-

    // KNET PAYMENT STATUS : {
    //   status: 'CAPTURED',
    //   id: 'chg_TS07A2720231108g6L70412970',
    //   source_object: 'source',
    //   customer_email: 'test@test.com',
    //   sdk_result: 'SUCCESS',
    //   charge_id: 'chg_TS07A2720231108g6L70412970',
    //   source_payment_type: 'DEBIT',
    //   customer_last_name: 'test',
    //   customer_middle_name: null,
    //   message: 'Captured',
    //   trx_mode: 'CHARGE',
    //   source_channel: 'INTERNET',
    //   customer_id: 'cus_TS06A2820231108Kk4t0412470',
    //   description: 'paymentStatementDescriptor',
    //   source_id: 'src_kw.knet',
    //   customer_first_name: 'test',
    // };

    // CARD PAYMENT STATUS : {
    //   customer_id: 'cus_TS06A2120230849Yo6x0512044',
    //   acquirer_id: null,
    //   source_object: 'token',
    //   customer_email: 'test@test.com',
    //   card_object: 'card',
    //   source_channel: 'INTERNET',
    //   customer_middle_name: null,
    //   charge_id: 'chg_TS01A2020230849o1M40512193',
    //   source_id: 'tok_O3qx14235495ucd5UK112696',
    //   source_payment_type: 'CREDIT',
    //   customer_first_name: 'test',
    //   acquirer_response_message: 'Approved',
    //   card_first_six: '512345',
    //   id: 'chg_TS01A2020230849o1M40512193',
    //   card_last_four: '0008',
    //   sdk_result: 'SUCCESS',
    //   message: 'Captured',
    //   acquirer_response_code: '00',
    //   status: 'CAPTURED',
    //   customer_last_name: 'test',
    //   card_exp_year: null,
    //   card_exp_month: null,
    //   trx_mode: 'CHARGE',
    //   card_brand: 'MASTERCARD',
    //   description: 'testDescriptor.',
    // };

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
        payment_method: selectedPayment || '',
      };

      if (selectedAddress !== null) {
        const key =
          selectedAddress === 1 ? 'shipping_as_billing' : 'billing_as_shipping';

        params[key] = 'yes';
      }

      if (coupon_code) {
        params.coupon_code = coupon_code;
      }

      if (selectedPayment === 'cod') {
        const res = await makeRequest('create_order', params, true);

        if (res) {
          const {Status, Message} = res;
          if (Status === true) {
            showSnack(Message);
            dispatch(fetchCartDataSuccess(update));
            setLoader(false);
            const {billing, order_number} = res.Data;
            navigation.navigate('OrderSuccess', {
              billing,
              order_number,
            });
          } else {
            setLoader(false);
          }
        }
      } else if (
        selectedPayment === 'tap' &&
        paymentStatus &&
        paymentStatus.sdk_result === 'SUCCESS'
      ) {
        params.transaction_id = paymentStatus?.id;

        const res = await makeRequest('create_order', params, true);
        if (res) {
          const {Status, Message} = res;
          if (Status === true) {
            showSnack(Message);
            dispatch(fetchCartDataSuccess(update));
            setLoader(false);
            const {billing, order_number} = res.Data;
            navigation.navigate('OrderSuccess', {
              billing,
              order_number,
              trx_ID: paymentStatus?.id,
            });
          } else {
            setLoader(false);
          }
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
            fontFamily: 'Montserrat-Medium',
            margin: hp(1),
            fontSize: wp(4.5),
          }}>
          Additional Information
        </Text>

        <Text
          style={{
            color: '#000000',
            fontFamily: 'Montserrat-Light',
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
              fontFamily: 'Montserrat-Medium',
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
              {Number(route?.params?.total_price)?.toFixed(2)}
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
                fontFamily: 'Montserrat-Medium',
              }}>
              Summary
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: wp(4),
                fontFamily: 'Montserrat-Medium',
              }}>
              {Number(route?.params?.total_price)?.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* SHIPING START */}
        <View style={{backgroundColor: '#fff', elevation: 5}}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Montserrat-Medium',
              marginVertical: hp(1.2),
              fontSize: wp(4),
              marginHorizontal: wp(2.5),
            }}>
            Shippping address
          </Text>
        </View>

        <RectButton
          onPress={() =>
            navigation.navigate('AddShippingAddressScreen-Cart', {
              type: 1,
            })
          }
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
              fontFamily: 'Montserrat-Medium',
              color: '#fff',
            }}>
            Add Shippping Address
          </Text>
        </RectButton>

        {shipping_address && (
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
                fontFamily: 'Montserrat-Light',
                fontSize: wp(4.2),
              }}>
              {shipping_address?.first_name}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'Montserrat-Light',
                fontSize: wp(4.2),
              }}>
              {shipping_address?.address_1}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'Montserrat-Light',
                fontSize: wp(4.2),
              }}>
              {shipping_address?.address_2}
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
                status={selectedAddress === 1 ? 'checked' : 'unchecked'}
                onPress={() =>
                  setSelectedAddress(selectedAddress === 1 ? null : 1)
                }
              />
              <Text
                style={[
                  styles.radioButtonText,
                  {fontFamily: 'Montserrat-Regular'},
                ]}>
                Select as a billing address
              </Text>
            </View>
          </View>
        )}
        {/* SHIPING END */}
        {/* BILLING START */}
        <View style={{backgroundColor: '#fff', elevation: 5}}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Montserrat-Medium',
              marginVertical: hp(1.2),
              fontSize: wp(4),
              marginHorizontal: wp(2.5),
            }}>
            Billing address
          </Text>
        </View>

        <RectButton
          onPress={() =>
            navigation.navigate('AddShippingAddressScreen-Cart', {
              type: 2,
            })
          }
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
              fontFamily: 'Montserrat-Medium',
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
                fontFamily: 'Montserrat-Light',
                fontSize: wp(4.2),
              }}>
              {billing_address?.first_name}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'Montserrat-Light',
                fontSize: wp(4.2),
              }}>
              {billing_address?.address_1}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'Montserrat-Light',
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
                status={selectedAddress === 2 ? 'checked' : 'unchecked'}
                onPress={() =>
                  setSelectedAddress(selectedAddress === 2 ? null : 2)
                }
              />
              <Text
                style={[
                  styles.radioButtonText,
                  {fontFamily: 'Montserrat-Regular'},
                ]}>
                Select as a shippping address
              </Text>
            </View>
          </View>
        )}
        {/* BILLING START */}

        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: hp(3),
            elevation: 3,
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Montserrat-Medium',
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
                status={selectedPayment === 'cod' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedPayment('cod')}
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
                status={selectedPayment === 'tap' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedPayment('tap')}
              />
            </View>
            <Text style={styles.radioButtonText}>
              Pay by Debit/Credit card only
            </Text>
          </View>
        </View>

        <PaymentUI
          amount={Number(route?.params?.total_price)?.toFixed(2)}
          handleSubmit={handleSubmit}
          customer={{
            email: billing_address?.email,
            first_name: billing_address?.first_name,
            last_name: billing_address?.last_name,
            phone: billing_address?.phone,
          }}
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
    fontFamily: 'Montserrat-Light',
    color: '#000000',
    marginLeft: wp(8),
  },
});
