/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  StatusBar,
  Modal,
} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import StaticImage from '../assets/images/product_image.webp';
import CartShimmer from '../shimmers/CartShimmer';
import {
  async_keys,
  clearData,
  getData,
  removeItem,
  storeData,
} from '../storage/UserPreference';
import {CommonActions} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCartDataRequest} from '../redux/action/cartActions';
import WebView from 'react-native-webview';

const CartMighzal = ({navigation}) => {
  const [visibleID, setVisibleID] = useState(1);
  const dispatch = useDispatch();
  const {cartData, isLoading, error} = useSelector(state => state.cart);

  console.log('cart', {cartData, isLoading, error});

  useEffect(() => {
    dispatch(fetchCartDataRequest());
  }, []);

  const handleCheckout = async () => {
    const auth = await getData(async_keys.auth_token);
    if (auth) {
      console.log(auth);
      alert('Coming soon');
    } else {
      await removeItem(async_keys.skip_login_screen);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LogoutNavigator'}],
        }),
      );
    }
  };

  const handleRemove = async product_id => {
    const cart = (await getData(async_keys.cart_data)) || [];
    const dataToSave = cart.filter(item => item.product_id !== product_id);
    await storeData(async_keys.cart_data, dataToSave);
    dispatch(fetchCartDataRequest());
  };

  const CartList = useMemo(
    () =>
      memo(({item}) => (
        <View
          key={item?.product_id?.toString()}
          style={{
            backgroundColor: '#fff',
            elevation: 2,
            borderRadius: wp(1.5),
            marginVertical: hp(0.5),
            marginHorizontal: wp(4),
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(0.5),
              marginHorizontal: wp(1),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              onPress={() => navigation.navigate('ProductDetails-Cart')}
              style={{
                color: '#000',
                fontSize: wp(4.3),
                marginLeft: wp(2),
              }}>
              {item?.product_name}
            </Text>

            <TouchableOpacity onPress={() => handleRemove(item?.product_id)}>
              <Entypo name="cross" color="#000" size={wp(5)} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetails-Cart')}
              activeOpacity={1}>
              <Image
                source={{uri: item?.image}}
                defaultSource={require('../assets/images/product_placeholder_image.png')}
                resizeMode="contain"
                style={{
                  height: wp(32),
                  width: wp(36),
                  margin: 1.5,
                  borderBottomLeftRadius: wp(1.5),
                }}
              />
            </TouchableOpacity>
            <View style={{marginLeft: wp(5)}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: wp(4),
                    fontWeight: '300',
                  }}>
                  Qty
                </Text>
                <RectButton onPress={() => setVisibleID(item.product_id)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginLeft: wp(3),
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.3}
                      style={{padding: wp(1.5)}}>
                      <Feather name="plus" color="#000" size={wp(5)} />
                    </TouchableOpacity>
                    <Text
                      // numberOfLines={1}
                      style={{
                        fontSize: wp(4.5),
                        color: '#000',
                        fontWeight: '300',
                        marginHorizontal: wp(2),
                        width: wp(13),
                        textAlign: 'center',
                      }}>
                      1
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.3}
                      style={{padding: wp(1.5)}}>
                      <Feather name="minus" color="#000" size={wp(5)} />
                    </TouchableOpacity>
                  </View>
                </RectButton>
              </View>
              <WebView
                source={{html: item?.price_html}}
                style={{}}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                textZoom={280}
                // injectedJavaScript={cutomScript}
              />
            </View>
          </View>
        </View>
      )),
    [cartData],
  );

  const flatListHeaderComponent = () => (
    <View style={{marginBottom: hp(2)}}>
      <TextInput
        placeholder="Enter Promo code"
        placeholderTextColor="rgba(0,0,0,0.5)"
        keyboardType="numeric"
        maxLength={10}
        style={styles.promoCodeInput}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#d68088',
          marginVertical: hp(2),
          alignSelf: 'flex-end',
          paddingVertical: hp(1.3),
          paddingHorizontal: wp(3.5),
          borderRadius: wp(2),
          elevation: 8,
          position: 'absolute',
          right: 20,
          top: -10,
        }}>
        <Text style={{color: '#ffffff', fontWeight: '500'}}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

      <Modal
        animationType="slide"
        transparent
        visible={visibleID !== null}
        onDismiss={() => setVisibleID(null)}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,.5)',
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: hp(6.2),
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: '60%',
              borderTopLeftRadius: wp(4),
              borderTopRightRadius: wp(4),
              padding: wp(5),
              justifyContent: 'center',
            }}>
            {Array.from({length: 9}, (_, index) => index + 1).map(item => (
              <Button
                textColor="#000"
                rippleColor="#eee"
                mode="text"
                onPress={() => console.log('Pressed')}>
                {item}
              </Button>
            ))}
          </View>
        </View>
      </Modal>

      <Text
        style={{
          fontSize: 22,
          color: '#000000',
          marginVertical: hp(2),
          marginHorizontal: wp(4),
        }}>
        Cart
      </Text>
      {isLoading ? (
        <CartShimmer />
      ) : (
        <>
          <FlatList
            data={cartData}
            renderItem={({item}) => <CartList item={item} />}
            ListHeaderComponent={flatListHeaderComponent}
            keyExtractor={item => item?.product_id?.toString()}
          />

          <View>
            <Text
              style={{
                marginHorizontal: wp(4),
                color: '#000',
                fontSize: wp(4.3),
                fontWeight: '500',
                borderBottomWidth: 1.5,
                paddingVertical: hp(0.5),
              }}>
              Free shipping for billing over 20 KWD
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: wp(4),
                marginVertical: hp(2),
              }}>
              <TouchableOpacity
                onPress={handleCheckout}
                style={{
                  backgroundColor: '#d68088',
                  //   marginVertical: hp(2),
                  alignSelf: 'flex-start',
                  paddingVertical: hp(1.3),
                  paddingHorizontal: wp(3.5),
                  borderRadius: wp(2),
                  elevation: 8,
                  marginHorizontal: wp(4),
                }}>
                <Text style={{color: '#ffffff', fontWeight: '500'}}>
                  Check Out
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: wp(4),
                }}>
                <View>
                  <Text style={{fontWeight: '300'}}>Discount</Text>
                  <Text style={{fontWeight: '500', color: 'black'}}>Total</Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: '300',
                      alignSelf: 'flex-start',
                    }}>
                    0 KWD
                  </Text>
                  <Text style={{fontWeight: '500', color: 'black'}}>
                    425.00 KWD
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CartMighzal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  promoCodeInput: {
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
    fontSize: wp(4.5),
    paddingLeft: wp(3),
    marginHorizontal: wp(4),
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
