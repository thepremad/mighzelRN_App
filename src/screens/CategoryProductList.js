import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import RenderProducts from '../components/RenderProducts';
import Header from '../components/Header';

import img_product from '../assets/images/product_image.webp';
import {makeRequest} from '../api/ApiInfo';
import {ActivityIndicator} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import RenderProductShimmer from '../shimmers/RenderProductShimmer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategoryProductsDataRequest} from '../redux/action/productActions';

const CategoryProductList = ({navigation, route}) => {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const {allProducts, isLoading, shimmer, error} = useSelector(
    state => state.product,
  );
  const {category_id} = route?.params;
  const found = allProducts.filter(
    item => Number(item.category_id) === Number(category_id),
  );

  console.log('CategoryProductList', {error, allProducts, found, category_id});

  useEffect(() => {
    const category_details = route.params;
    if (category_details) {
      setCategoryDetails(category_details);
      dispatch(fetchCategoryProductsDataRequest(category_id, allProducts));
    }
  }, []);

  // const fetchProducts = async id => {
  //   try {
  //     const found = allProducts.filter(item => item.category_id === id);

  //   } catch (error) {
  //     console.log('fetchProducts()', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header
        navAction="back"
        title={categoryDetails?.category_name}
        titleStyle={{color: '#d68088'}}
        search
      />

      {isLoading ? (
        <RenderProductShimmer />
      ) : (
        <FlatList
          numColumns={2}
          keyExtractor={i => i?.product_id?.toString()}
          data={found[0]?.items}
          renderItem={({item, index}) => (
            <RenderProducts item={item} index={index} isLoading={isLoading} />
          )}
          getItemLayout={(data, index) => ({
            length: hp(23),
            offset: hp(23) * index,
            index,
          })}

          // initialNumToRender={8}
          // maxToRenderPerBatch={8}
          // windowSize={10}
        />
      )}
    </View>
  );
};

export default CategoryProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
