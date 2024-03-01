import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import WebView from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

const RenderProducts = ({item, index, home, handleRelatedProd}) => {
  // const [imageLoading, setImageLoading] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  console.log('item', route?.name, item);

  const handleProductDetails = useCallback(
    product_id => {
      // switch (route.name) {
      //   case 'ProductList-Category':
      //     navigation.navigate('ProductDetails-Category', {product_id});
      //     break;

      //   case 'HomeScreen' || 'ProductList-Home':
      //     navigation.navigate('ProductDetails-Home', {product_id});
      //     break;

      //   case 'ProductDetails-Home' || 'ProductDetails-Category':
      //     handleRelatedProd(product_id);
      // }

      if (route.name === 'ProductList-Category') {
        navigation.navigate('ProductDetails-Category', {product_id});
      } else if (
        route.name === 'HomeScreen' ||
        route.name === 'ProductList-Home'
      ) {
        navigation.navigate('ProductDetails-Home', {product_id});
      } else if (
        route.name === 'ProductDetails-Home' ||
        route.name === 'ProductDetails-Category'
      ) {
        handleRelatedProd(product_id);
      }
    },
    [route, navigation],
  );

  return (
    <TouchableOpacity
      onPress={() => handleProductDetails(item.product_id)}
      activeOpacity={0.9}
      style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: item?.images[0],
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        defaultSource={require('../assets/images/product_placeholder_image.png')}
        resizeMode={FastImage.resizeMode.stretch}
      />

      <Text
        numberOfLines={1}
        style={[styles.nameText, home && {alignSelf: 'center'}]}>
        {item?.product_name}
      </Text>
      {/* <View style={{flexDirection: 'row'}}>
        {item?.regular_price && item?.regular_price > item?.sale_price && (
          <Text style={styles.mrpText}>{item?.regular_price} KWD</Text>
        )}
        <Text style={styles.priceText}>{item?.sale_price} KWD</Text>
      </View> */}

      <WebView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        source={{html: item?.price_html}}
        style={[
          {
            height: hp(2.3),
          },
          home && {
            alignSelf: 'center',
            width: '38%',
          },
        ]}
        textZoom={280}
        // injectedJavaScript={cutomScript}
      />
    </TouchableOpacity>
  );
};

// const hh = '<del><span class=\"woocommerce-Price-amount amount\"><bdi>20.00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">KWD</span></bdi></span></del>
// <ins><span class=\"woocommerce-Price-amount amount\"><bdi>14.00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">KWD</span></bdi></span></ins>'

export default memo(RenderProducts);

const styles = StyleSheet.create({
  container: {
    width: '46%',
    marginHorizontal: '2%',
    marginVertical: hp(2),
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    // height: hp(21),
  },
  nameText: {
    fontSize: wp(3.5),
    color: '#c6930a',
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase',
    marginRight: wp(1.9),
  },
  mrpText: {
    color: '#999',
    fontSize: wp(3),
    textDecorationLine: 'line-through',
    marginRight: wp(2),
  },
  priceText: {
    color: '#d68088',
    fontSize: wp(3),
    fontFamily: 'Montserrat-Regular',
  },
});
