/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
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
import {makeRequest} from '../api/ApiInfo';
import {Button} from 'react-native-paper';
import {async_keys, getData, storeData} from '../storage/UserPreference';
import ProductDetailShimmer from '../shimmers/ProductDetailShimmer';
import {fetchCartDataRequest} from '../redux/action/cartActions';
import {useDispatch} from 'react-redux';

const ProductDetails = ({navigation, route}) => {
  const [loader, setLoader] = useState(true);
  const [img_index, setImg_index] = useState(0);
  const [atribute_index, setAtribute_index] = useState([]);
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const params = route.params;
    if (params) {
      fetchProductDetails(params.product_id);
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

  const handleAddToCart = async () => {
    const cartData = (await getData(async_keys.cart_data)) || [];

    const dataToSave = {
      product_id: data?.product_id,
      product_name: data?.product_name,
      image: data?.images[0],
      price_html: data?.price_html,
    };

    const index = cartData.findIndex(
      i => i.product_id === dataToSave.product_id,
    );

    if (index === -1) {
      await storeData(async_keys.cart_data, [...cartData, dataToSave]).then(
        () => {
          dispatch(fetchCartDataRequest());
        },
      );
    }
  };

  console.log('setData', data);

  const renderRelatedProduct = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: '46%',
          alignItems: 'center',
          marginHorizontal: wp(2),
          marginVertical: hp(1),
        }}>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          style={{height: wp(35), width: '100%'}}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: wp(3.8),
            fontFamily: 'Roboto-Medium',
            color: '#000',
            marginTop: hp(1),
            textTransform: 'capitalize',
          }}>
          {item.name}
        </Text>

        <Text
          style={{
            fontSize: wp(3.9),
            fontFamily: 'Roboto-Regular',
            color: '#999',
          }}>
          {item.price}
        </Text>
      </TouchableOpacity>
    );
  };

  return loader ? (
    <ProductDetailShimmer />
  ) : (
    <View style={styles.container}>
      <Header
        navAction="back"
        title={data?.product_name || ''}
        titleStyle={{fontSize: wp(4.8), fontWeight: '300'}}
      />

      <View style={styles.homeCotainer}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1, paddingBottom: hp(1)}}>
          <Image
            source={
              loader
                ? require('../assets/images/product_placeholder_image.png')
                : {uri: data?.images[img_index]}
            }
            defaultSource={require('../assets/images/product_placeholder_image.png')}
            style={styles.largeImg}
          />

          <View>
            <FlatList
              data={data?.images}
              horizontal
              renderItem={({item, index}) => (
                <RectButton onPress={() => setImg_index(index)}>
                  <Image
                    source={
                      loader
                        ? require('../assets/images/product_placeholder_image.png')
                        : {uri: item}
                    }
                    style={styles.smallImg}
                    borderRadius={wp(1)}
                    defaultSource={require('../assets/images/product_placeholder_image.png')}
                  />
                </RectButton>
              )}
              showsHorizontalScrollIndicator={false}
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
                      textColor="#000"
                      rippleColor="#d68088"
                      onPress={() =>
                        setAtribute_index([
                          ...atribute_index?.map(dd => {
                            if (dd.id === mainItem?.id) {
                              return {...dd, index};
                            } else {
                              return dd;
                            }
                          }),
                          {id: mainItem?.id, index},
                        ])
                      }
                      style={[
                        styles.selectionBox,
                        atribute_index?.filter(
                          atributes => atributes.id === mainItem.id,
                        )[0]?.index === index && {borderColor: '#d68088'},
                      ]}>
                      {item}
                    </Button>
                  )}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, ind) => ind.toString()}
                />
              </View>
            ))}
          </View>

          <RectButton onPress={handleAddToCart} style={[styles.addButton]}>
            <Text style={[styles.addText]}>Add to Cart</Text>
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

          {/* <FlatList
            scrollEnabled={false}
            data={newArrival}
            keyExtractor={item => item.id.toString()}
            renderItem={renderRelatedProduct}
            ListHeaderComponent={() => (
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: hp(0.5),
                  marginTop: hp(1),
                }}>
                Related Product
              </Text>
            )}
            numColumns={2}
            contentContainerStyle={{borderTopWidth: 0.7, borderColor: '#ccc'}}
          /> */}
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
  },
  productNameText: {
    color: '#000',
    fontSize: wp(4.3),
    fontWeight: '400',
    marginHorizontal: wp(2),
    textTransform: 'capitalize',
  },
  selectionTitle: {
    color: '#000',
    fontSize: wp(3.8),
    fontWeight: '400',
    marginHorizontal: wp(2),
    marginBottom: hp(1.6),
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
    fontWeight: '500',
  },
  productDetailsText: {
    textTransform: 'capitalize',
    marginHorizontal: wp(10),
  },
});
