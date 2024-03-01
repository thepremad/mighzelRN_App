/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {useSelector} from 'react-redux';
import WebView from 'react-native-webview';

const OrderScreen = ({navigation, route}) => {
  const {billing, order_number, trx_ID} = route?.params;

  // return (
  //   <WebView
  //     source={{uri: route?.params?.payment_url}}
  //     // source={{
  //     //   uri: 'https://mighzalalarab.com/checkout/order-pay/47210/?pay_for_order=true&key=wc_order_7SBMk6x1Bqg4U',
  //     // }}
  //     style={{
  //       flex: 1,
  //     }}
  //     renderLoading={() => (
  //       <View style={{flex: 1}}>
  //         <ActivityIndicator color="#d68088" size="large" />
  //       </View>
  //     )}
  //     loa
  //     // textZoom={250}
  //     // scrollEnabled={false}
  //     showsHorizontalScrollIndicator={false}
  //     showsVerticalScrollIndicator={false}
  //     // injectedJavaScript={cutomScript}
  //   />
  // );
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#d680887a',
          borderRadius: wp(10),
          padding: wp(4),
          alignSelf: 'center',
        }}>
        <Icon source="check" size={wp(7)} color="#fff" />
      </View>
      <Text style={styles.orderText}>Order has been placed,</Text>
      <Text style={styles.thankYouText}>Thank you</Text>
      <Text style={styles.orderConfimationText}>
        Order <Text style={{color: '#d68088'}}>#{order_number}</Text>{' '}
        confimation has been send to your email
      </Text>

      <Text style={{fontSize: wp(4), color: '#454242', alignSelf: 'center'}}>
        Thank you for shopping with us
      </Text>

      <View style={styles.deliveryBox}>
        <Text
          style={[
            styles.delivryText,
            {alignSelf: 'center', marginTop: hp(1), fontWeight: '500'},
          ]}>
          Delivery address
        </Text>
        {Object.keys(billing).map((key, index) => (
          <View
            style={[
              {flexDirection: 'row', justifyContent: 'space-between'},
              index + 1 !== Object.keys(billing).length && {
                borderBottomColor: '#fff',
                borderBottomWidth: 2,
              },
            ]}>
            <Text style={[styles.delivryText, {marginTop: hp(1)}]}>
              {key.replace('_', ' ')}
            </Text>
            <Text
              style={[
                styles.delivryText,
                {marginTop: hp(1)},
                key === 'email' && {textTransform: 'lowercase'},
              ]}>
              {billing[key]}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  OrderScreenText: {
    fontSize: wp(4),
  },

  orderText: {
    fontSize: wp(4),
    color: '#010910',
    fontWeight: '500',
    marginTop: hp(2),
  },

  thankYouText: {
    fontSize: wp(4),
    color: '#010910',
    fontWeight: '500',
  },

  orderConfimationText: {
    fontSize: wp(4),
    color: '#454242',
    marginTop: hp(2),
    marginHorizontal: wp(1),
    textAlign: 'center',
  },

  deliveryBox: {
    // height: hp(18),
    backgroundColor: '#f0f0f0',
    marginTop: hp(4),
    borderRadius: wp(2),
    width: wp(96),
    padding: hp(1),
    marginBottom: hp(1),
  },

  delivryText: {
    fontSize: wp(4),
    color: '#000',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
