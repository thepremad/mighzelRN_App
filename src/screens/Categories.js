/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import StaticImage from '../assets/images/product_image.webp';
import {makeRequest} from '../api/ApiInfo';
import {ActivityIndicator} from 'react-native-paper';

import CategoryShimmer from '../shimmers/CategoryShimmer';

const Categories = props => {
  const [categoryData, setCategoryData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetchCtegories();
  }, []);

  const fetchCtegories = async () => {
    try {
      setLoader(true);
      const result = await makeRequest(`categories`);
      if (result) {
        const {Status} = result;
        if (Status === true) {
          const {Data} = result;
          setCategoryData(Data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('fetchCtegories()', error);
    }
  };

  const handleProductMighzal = item => {
    const {category_id, category_name} = item;
    props.navigation.navigate('ProductList-Category', {
      category_id,
      category_name,
    });
  };

  const categoryList = ({item}) => (
    <TouchableOpacity
      key={item?.category_id}
      onPress={() => handleProductMighzal(item)}
      style={{
        flexDirection: 'row',
        height: hp(17),
        // aspectRatio: 1 / 1,
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: wp(1),
        marginVertical: hp(1.5),
        marginHorizontal: wp(3),
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          alignSelf: 'center',
          marginLeft: wp(5),
          fontSize: wp(4.5),
          color: '#000000',
          fontWeight: '300',
        }}>
        {item?.category_name}
      </Text>
      <Image
        source={
          loader
            ? require('../assets/images/product_placeholder_image.png')
            : {uri: item?.image}
        }
        defaultSource={require('../assets/images/product_placeholder_image.png')}
        // resizeMode="contain"
        style={{height: hp(17), width: hp(17)}}
      />
    </TouchableOpacity>
  );
  const listHeaderComponent = () => (
    <View
      style={{
        marginHorizontal: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEA0A0',
        paddingVertical: hp(4),
        borderRadius: wp(3),
      }}>
      <Text style={{color: '#ffffff', fontSize: 23}}>Summer Sales </Text>
      <Text style={{color: '#ffffff'}}>Upto 50% off</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

      {/* {loader && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',

            height: hp(100),
            width: wp(100),
            zIndex: 9,
          }}>
          <ActivityIndicator color="#d68088" size={'large'} />
        </View>
      )} */}

      <Text
        style={{
          marginHorizontal: wp(3),
          marginVertical: hp(2),
          fontSize: wp(5),
          color: 'black',
        }}>
        Category
      </Text>

      {loader ? (
        <CategoryShimmer />
      ) : (
        <FlatList
          data={categoryData}
          renderItem={categoryList}
          ListHeaderComponent={listHeaderComponent}
          keyExtractor={item => item?.category_id?.toString()}
        />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  categoryImage: {},
});
