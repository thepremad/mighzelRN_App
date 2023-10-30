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

const CategoryProductList = ({navigation, route}) => {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const category_details = route.params;
    if (category_details) {
      setCategoryDetails(category_details);
      fetchProducts(category_details.category_id);
    }
  }, []);

  const fetchProducts = async id => {
    try {
      setLoader(true);
      const result = await makeRequest(`category_products?category_id=${id}`);
      if (result) {
        const {Status} = result;
        if (Status === true) {
          const {Data} = result;
          setData(Data.map(item => ({...item, imageLoading: true})));
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

  return (
    <View style={styles.container}>
      <Header
        navAction="back"
        title={categoryDetails?.category_name}
        titleStyle={{color: '#d68088'}}
        search
      />

      {loader ? (
        <RenderProductShimmer />
      ) : (
        <FlatList
          numColumns={2}
          keyExtractor={i => i?.product_id?.toString()}
          data={data}
          renderItem={({item, index}) => (
            <RenderProducts
              item={item}
              index={index}
              loader={loader}
              setData={setData}
              data={data}
            />
          )}
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
