/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RectButton} from 'react-native-gesture-handler';
import OrderListShimmer from '../shimmers/OrderListShimmer';
import {useSelector} from 'react-redux';

const CancelledScreen = ({navigation}) => {
  const [loader, setLoader] = useState(true);
  const [list, setList] = useState([
    {
      id: 1,
      trackingNumber: '45971',
      date: '2023-08-11 11:27:02',
      quantity: '1',
      totalAmount: '11.00KWD',
      status: 'wc-cancelled',
    },
    {
      id: 2,
      trackingNumber: '45972',
      date: '2023-08-11 11:40:30',
      quantity: '1',
      totalAmount: '11.00KWD',
      status: 'wc-cancelled',
    },
    {
      id: 3,
      trackingNumber: '45973',
      date: '2023-08-12 11:33:01',
      quantity: '1',
      totalAmount: '11.00KWD',
      status: 'wc-cancelled',
    },
  ]);

  useEffect(() => {
    const timeOutID = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timeOutID);
  }, []);

  const {orderData, isLoading, shimmer, error} = useSelector(
    state => state.order,
  );

  const data = orderData.filter(item => item.status === 'cancelled');
  const ItemView = ({item}) => {
    return (
      <RectButton
        onPress={() => navigation.navigate('OrderDetailsScreen', {item})}
        style={{
          marginHorizontal: wp(1),
          backgroundColor: '#fff',
          marginVertical: hp(0.5),
          elevation: 5,
          borderRadius: wp(1),
        }}>
        <View
          style={{
            marginVertical: hp(1),
            marginHorizontal: wp(2),
          }}>
          <Text
            style={{
              fontSize: wp(3.9),
              fontFamily: 'Montserrat-Medium',
              color: '#838383',
              marginLeft: 'auto',
            }}>
            {item.date_created}
          </Text>

          <Text
            style={{
              fontSize: wp(3.9),
              fontFamily: 'Montserrat-SemiBold',
              color: '#000',
            }}>
            #{item?.order_number}
            {'\n'}Tracking No:
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: wp(3.9),
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
              }}>
              Quantity:{' '}
              <Text
                style={{
                  fontSize: wp(3.9),
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#999',
                }}>
                {item.quantity}
              </Text>
            </Text>

            <Text
              style={{
                fontSize: wp(3.9),
                fontFamily: 'Montserrat-SemiBold',
                color: '#999',
                marginLeft: 'auto',
              }}>
              Total Amount:{' '}
              <Text
                style={{
                  fontSize: wp(3.9),
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#000',
                }}>
                {item.total} KWD
              </Text>
            </Text>
          </View>

          <Text
            style={{
              fontSize: wp(3.9),
              fontFamily: 'Montserrat-Regular',
              color: 'red',
              marginLeft: 'auto',
              textTransform: 'capitalize',
            }}>
            {item.status}
          </Text>
        </View>
      </RectButton>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeContainer}>
        {isLoading ? (
          <OrderListShimmer />
        ) : (
          <FlatList
            data={data}
            renderItem={ItemView}
            ListEmptyComponent={() => (
              <View style={{alignItems: 'center'}}>
                <Text style={{}}>No Orders found !</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: hp(1)}}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CancelledScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
  },
});
