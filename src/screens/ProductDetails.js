/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Header from '../components/Header';

import img_product from '../assets/images/product_image.webp';
import WebView from 'react-native-webview';
import {RectButton} from 'react-native-gesture-handler';
import {BASE_URL, makeRequest} from '../api/ApiInfo';
import {ActivityIndicator, Button} from 'react-native-paper';
import {async_keys, getData, storeData} from '../storage/UserPreference';
import ProductDetailShimmer from '../shimmers/ProductDetailShimmer';
import {
  fetchCartDataRequest,
  fetchCartDataSuccess,
} from '../redux/action/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import {showSnack} from '../components/Snackbar';
import FastImage from 'react-native-fast-image';
import RenderRelatedShimmer from '../shimmers/RenderRelatedShimmer';
import RenderProducts from '../components/RenderProducts';

const ProductDetails = ({navigation, route}) => {
  const [loader, setLoader] = useState(true);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [relatedLoader, setRelatedLoader] = useState(true);
  const [relatedData, setRelatedData] = useState([]);
  const [img_index, setImg_index] = useState(0);
  const [attribute, setAttribute] = useState('');
  const [atribute_index, setAtribute_index] = useState([]);
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const {cartData, isLoading, error} = useSelector(state => state.cart);

  useEffect(() => {
    const params = route.params;
    if (params) {
      if (params.product_id) {
        fetchProductDetails(params.product_id);
      }
    }
  }, []);

  const fetchProductDetails = async product_id => {
    try {
      setLoader(true);
      const result = await makeRequest(
        `product_detail?product_id=${product_id}`,
      );
      if (result) {
        const {Status} = result;

        if (Status === true) {
          const {Data} = result;
          setData(Data);
          setLoader(false);
          fetchRelatedProducts(Data?.related_ids);
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('fetchProducts()', error);
    }
  };

  const fetchRelatedProducts = async related_ids => {
    try {
      setRelatedLoader(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify(related_ids);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const res = await fetch(
        `${BASE_URL}get_related_product_ids`,
        requestOptions,
      );

      if (res) {
        const result = await res.json();
        console.log('API-INFO', {
          url: 'get_related_product_ids',
          requestOptions,
          response: res,
          result,
        });
        if (result) {
          const {Status} = result;
          if (Status === true) {
            const {Data} = result;
            setRelatedData(Data);
            setRelatedLoader(false);
          } else {
            setRelatedLoader(false);
          }
        } else {
          setRelatedLoader(false);
        }
      } else {
        setRelatedLoader(false);
      }
    } catch (error) {
      setRelatedLoader(false);
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const items = {
        product_id: attribute || data?.product_id,
        product_name: data?.product_name,
        images: data?.images,
        price_html: data?.price_html,
        total: data?.sale_price,
        quantity: 1,
      };

      const update = {
        ...cartData,
        items: [...cartData?.items, items],
        totals: {
          ...cartData.totals,
          total_price:
            Number(cartData?.totals?.total_price) + Number(data?.sale_price),
        },
        items_count: Number(cartData?.items_count) + 1,
      };

      const index = cartData?.items.findIndex(
        i => i.product_id === items.product_id,
      );

      if (index === -1) {
        setAddToCartLoader(true);
        const token = await getData(async_keys.auth_token);

        if (token) {
          const params = {
            product_id: attribute || data?.product_id,
            token,
            quantity: 1,
          };
          const res = await makeRequest(`add_to_cart`, params, true);
          if (res) {
            const {Status, Message} = res;
            if (Status === true) {
              const {Data} = res;
              dispatch(fetchCartDataSuccess(Data));
              showSnack('Product added to cart');
            } else {
              showSnack(Message, null, true);
            }
          }
        } else {
          await storeData(async_keys.cart_data, {...cartData, ...update}).then(
            () => {
              dispatch(fetchCartDataSuccess(update));
              showSnack('Product added to cart');
            },
          );
        }
        setAddToCartLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRelatedProd = prod_id => fetchProductDetails(prod_id);

  console.log('setData', attribute);

  return loader ? (
    <ProductDetailShimmer />
  ) : (
    <View style={styles.container}>
      <Header
        navAction="back"
        title={data?.product_name || ''}
        titleStyle={{fontSize: wp(4.8), fontFamily: 'Montserrat-Regular'}}
      />

      {addToCartLoader && (
        <View
          style={{
            width: wp(100),
            height: hp(100),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 99,
          }}>
          <ActivityIndicator size="large" color="#d68088" />
        </View>
      )}

      <View style={styles.homeCotainer}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1, paddingBottom: hp(1)}}>
          <FastImage
            source={{
              uri: data?.images[img_index],
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.normal,
            }}
            defaultSource={require('../assets/images/product_placeholder_image.png')}
            style={styles.largeImg}
          />

          <View>
            <FlatList
              data={data?.images}
              horizontal
              renderItem={({item, index}) => (
                <RectButton onPress={() => setImg_index(index)}>
                  <FastImage
                    source={{
                      uri: item,
                      cache: FastImage.cacheControl.immutable,
                      priority: FastImage.priority.normal,
                    }}
                    defaultSource={require('../assets/images/product_placeholder_image.png')}
                    style={styles.smallImg}
                  />
                </RectButton>
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index?.toString()}
            />
          </View>

          <Text style={styles.productNameText}>{data?.product_name || ''}</Text>
          <WebView
            source={{html: data?.price_html}}
            style={{
              borderWidth: 2,
              height: hp(4),
              marginHorizontal: wp(4),
              marginBottom: hp(2),
            }}
            textZoom={250}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // injectedJavaScript={cutomScript}
          />

          <View style={styles.selectionContainer}>
            {data?.attributes?.map(mainItem => (
              <View key={mainItem?.id}>
                <Text style={styles.selectionTitle}>{mainItem?.name}</Text>
                <FlatList
                  data={mainItem?.options}
                  horizontal
                  renderItem={({item, index}) => (
                    <Button
                      mode="outlined"
                      // textColor={item?.value?.toLowerCase() || '#000'}
                      textColor="#000"
                      rippleColor="#d68088"
                      onPress={() => {
                        setAtribute_index([
                          ...atribute_index?.map(dd => {
                            if (dd.id === mainItem?.id) {
                              return {...dd, index};
                            } else {
                              return dd;
                            }
                          }),
                          {id: mainItem?.id, index},
                        ]);

                        setAttribute(item?.product_id);
                      }}
                      labelStyle={{
                        fontFamily: 'Montserrat-SemiBold',
                      }}
                      style={[
                        styles.selectionBox,
                        atribute_index?.filter(
                          atributes => atributes.id === mainItem.id,
                        )[0]?.index === index && {borderColor: '#d68088'},
                      ]}>
                      {item?.value}
                    </Button>
                  )}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, ind) => ind.toString()}
                />
              </View>
            ))}
          </View>

          <RectButton
            onPress={handleAddToCart}
            style={[
              styles.addButton,
              cartData?.items.findIndex(
                i => i.product_id === data?.product_id,
              ) > -1 && {backgroundColor: '#fff'},
            ]}>
            <Text
              style={[
                styles.addText,
                cartData?.items.findIndex(
                  i => i.product_id === data?.product_id,
                ) > -1 && {color: '#D68088'},
              ]}>
              Add to Cart
            </Text>
          </RectButton>

          <View style={{flex: 1}}>
            <WebView
              source={{html: data?.description}}
              style={{
                borderWidth: 2,
                height: hp(20),
                // marginHorizontal: wp(7),
                marginBottom: hp(2),
              }}
              textZoom={230}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {relatedLoader ? (
            <RenderRelatedShimmer center />
          ) : (
            <FlatList
              scrollEnabled={false}
              data={relatedData}
              keyExtractor={item => item?.product_id?.toString()}
              renderItem={({item}) => (
                <RenderProducts
                  handleRelatedProd={handleRelatedProd}
                  item={item}
                />
              )}
              ListHeaderComponent={() => (
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: hp(0.5),
                    marginTop: hp(1),
                  }}>
                  Related Products
                </Text>
              )}
              numColumns={2}
              contentContainerStyle={{borderTopWidth: 0.7, borderColor: '#ccc'}}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeCotainer: {
    flex: 1,
  },
  largeImg: {
    width: '100%',
    height: hp(42),
  },
  smallImg: {
    width: wp(15),
    height: wp(20),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    borderRadius: wp(1),
  },
  productNameText: {
    color: '#000',
    fontSize: wp(4.3),
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: wp(2),
    textTransform: 'capitalize',
  },
  selectionTitle: {
    color: '#000',
    fontSize: wp(3.8),
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: wp(2),
    marginVertical: hp(1.6),
  },
  selectionBox: {
    borderWidth: 1,
    borderColor: '#888',
    marginHorizontal: wp(1.6),
    borderRadius: wp(8),
  },
  addButton: {
    marginVertical: hp(4),
    marginHorizontal: wp(2),
    paddingVertical: hp(1.4),
    alignItems: 'center',
    backgroundColor: '#d68088',
    borderRadius: wp(1),
    elevation: 3,
  },
  addText: {
    color: '#fff',
    fontSize: wp(4.2),
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase',
  },
  productDetailsText: {
    textTransform: 'capitalize',
    marginHorizontal: wp(10),
  },
});
