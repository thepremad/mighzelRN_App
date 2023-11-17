/* eslint-disable no-catch-shadow */
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
} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

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
import {
  fetchCartDataRequest,
  fetchCartDataSuccess,
} from '../redux/action/cartActions';
import WebView from 'react-native-webview';
import {makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';
import FastImage from 'react-native-fast-image';

const CartMighzal = ({navigation}) => {
  const [visibleID, setVisibleID] = useState(null);
  const [quantity_limits, setQuantity_limits] = useState({});
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {cartData, isLoading, error} = useSelector(state => state.cart);

  console.log('cart', {cartData, isLoading, error});

  useEffect(() => {
    dispatch(fetchCartDataRequest());
  }, []);

  const handleCheckout = async () => {
    const token = await getData(async_keys.auth_token);
    if (token) {
      navigation.navigate('CheckOutScreen');
    } else {
      await removeItem(async_keys.skip_login_screen);
      navigation.navigate('Logout', {
        screen: 'LoginScreen',
        params: {back: true},
      });
    }
  };

  const handleRemove = async item => {
    try {
      setLoader(true);
      const index = cartData?.items.findIndex(
        i => i.product_id === item.product_id,
      );
      if (index > -1) {
        const items = cartData?.items.filter(
          prod => prod.product_id !== item?.product_id,
        );
        const dataToSave = {
          ...cartData,
          items,
          totals: {
            ...cartData.totals,
            total_price:
              Number(cartData?.totals?.total_price) - Number(item?.total),
          },
          items_count:
            Number(cartData?.items_count) - cartData?.items[index]?.quantity,
        };

        //
        const token = await getData(async_keys.auth_token);

        if (token) {
          const params = {
            key: item?.key,
            token,
          };
          const res = await makeRequest(`remove_cart_item`, params, true);
          if (res) {
            const {Status, Message} = res;
            if (Status === true) {
              const {Data} = res;
              dispatch(fetchCartDataSuccess(Data));
            } else {
              showSnack(Message, null, true);
            }
          }
        } else {
          await storeData(async_keys.cart_data, dataToSave).then(() => {
            dispatch(fetchCartDataSuccess(dataToSave));
          });
        }
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantity = async quantity => {
    try {
      //LOADER
      setLoader(true);
      const initialQuantity = cartData?.items?.filter(
        prod => Number(prod?.product_id) === Number(visibleID),
      )[0]?.quantity;

      const token = await getData(async_keys.auth_token);

      if (token) {
        const params = {
          product_id: visibleID,
          token,
          quantity: quantity - initialQuantity,
        };
        setVisibleID(null);
        const res = await makeRequest(`add_to_cart`, params, true);
        if (res) {
          const {Status, Message} = res;
          if (Status === true) {
            const {Data} = res;
            dispatch(fetchCartDataSuccess(Data));
          } else {
            showSnack(Message, null, true);
          }
        }
      } else {
        // const findProd = cartData?.items?.filter(
        //   prod => Number(prod?.product_id) === Number(visibleID),
        // )[0];
        // let count = 0;
        // cartData?.items?.map(item => {
        //   if (Number(item?.product_id) === Number(visibleID)) {
        //     count += quantity;
        //   } else {
        //     count += item.quantity;
        //   }
        // });
        // const update = {
        //   ...cartData,
        //   items: cartData?.items?.map(prod => {
        //     if (Number(prod?.product_id) === Number(visibleID)) {
        //       return {
        //         ...prod,
        //         quantity,
        //         total: Number(prod?.sale_price) * quantity,
        //       };
        //     }
        //     return prod;
        //   }),
        //   items_count: count,
        //   totals: {
        //     ...cartData.totals,
        //     total_price:
        //       Number(cartData?.totals?.total_price) -
        //       Number(findProd?.total) +
        //       Number(findProd?.sale_price) * Number(quantity),
        //   },
        // };
        // dispatch(fetchCartDataSuccess(update));
        // setVisibleID(null);
      }
      //LOADER
      setLoader(false);
    } catch (error) {
      //LOADER
      setLoader(false);
      console.log(error);
    }
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
              onPress={() =>
                navigation.navigate('ProductDetails-Cart', {
                  product_id: item?.product_id,
                })
              }
              style={{
                color: '#000',
                fontSize: wp(4.3),
                marginLeft: wp(2),
              }}>
              {item?.product_name}
            </Text>

            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Entypo name="cross" color="#000" size={wp(5)} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails-Cart', {
                  product_id: item?.product_id,
                })
              }
              activeOpacity={1}>
              <FastImage
                source={{
                  uri: item?.images[0],
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                defaultSource={require('../assets/images/product_placeholder_image.png')}
                resizeMode={FastImage.resizeMode.contain}
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
                    fontFamily: 'Roboto-Light',
                    marginRight: wp(3),
                  }}>
                  Qty
                </Text>
                <RectButton
                  onPress={async () => {
                    if (await getData(async_keys.auth_token)) {
                      setVisibleID(item.product_id);
                      setQuantity_limits(item.quantity_limits);
                    } else {
                      await removeItem(async_keys.skip_login_screen);
                      navigation.navigate('Logout', {
                        screen: 'LoginScreen',
                        params: {back: true},
                      });
                    }
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      // marginLeft: wp(3),
                    }}>
                    <Feather name="plus" color="#000" size={wp(5)} />
                    <Text
                      // numberOfLines={1}
                      style={{
                        fontSize: wp(4.5),
                        color: '#000',
                        fontFamily: 'Roboto-Light',
                        marginHorizontal: wp(2),
                        width: wp(13),
                        textAlign: 'center',
                      }}>
                      {item?.quantity}
                    </Text>
                    <Feather name="minus" color="#000" size={wp(5)} />
                  </View>
                </RectButton>
              </View>
              <Text style={{marginBottom: hp(2)}}>{item?.total || 0} KWD</Text>
              {/* <WebView
                source={{html: item?.price_html}}
                style={{}}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                textZoom={280}
                // injectedJavaScript={cutomScript}
              /> */}
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
        <Text style={{color: '#ffffff', fontFamily: 'Roboto-Medium'}}>
          Apply
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

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

      <Modal
        onBackdropPress={() => setVisibleID(null)}
        onBackButtonPress={() => setVisibleID(null)}
        isVisible={visibleID !== null}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: '60%',
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
            padding: wp(5),
            // justifyContent: 'center',
          }}>
          {Array.from(
            {length: quantity_limits?.maximum || 9},
            (_, index) => index + 1,
          ).map(item => (
            <Button
              key={item}
              textColor="#000"
              rippleColor="#eee"
              mode="text"
              onPress={() => handleQuantity(item)}>
              {item}
            </Button>
          ))}
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
            data={cartData?.items || []}
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
                fontFamily: 'Roboto-Medium',
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
                <Text style={{color: '#ffffff', fontFamily: 'Roboto-Medium'}}>
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
                  <Text style={{fontFamily: 'Roboto-Light'}}>Discount</Text>
                  <Text style={{fontFamily: 'Roboto-Medium', color: 'black'}}>
                    Total
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Light',
                      alignSelf: 'flex-start',
                    }}>
                    {cartData?.totals?.total_discount || 0} KWD
                  </Text>
                  <Text style={{fontFamily: 'Roboto-Medium', color: 'black'}}>
                    {cartData?.totals?.total_price || 0} KWD
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
    fontFamily: 'Roboto-Medium',
  },
});
