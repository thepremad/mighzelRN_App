import {View, Text, FlatList} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../components/Header';
import {Button} from 'react-native-paper';

const ProductDetailShimmer = () => {
  return (
    <>
      <Header
        navAction="back"
        title=""
        titleStyle={{fontSize: wp(4.8), fontFamily: 'Roboto-Light'}}
      />
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item height={hp(42)} width={wp(100)} />

        <SkeletonPlaceholder.Item flexDirection="row">
          {Array(6)
            .fill(1)
            .map((i, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                width={wp(15)}
                height={wp(20)}
                marginHorizontal={wp(2)}
                marginVertical={hp(1)}
              />
            ))}
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          width={wp(60)}
          height={hp(2)}
          marginVertical={hp(1)}
          marginHorizontal={wp(2)}
        />
        <SkeletonPlaceholder.Item
          width={wp(17)}
          height={hp(2)}
          marginVertical={hp(1)}
          marginHorizontal={wp(4)}
        />
        <SkeletonPlaceholder.Item
          width={wp(30)}
          height={hp(1.5)}
          marginVertical={hp(1)}
          marginHorizontal={wp(2)}
        />

        <SkeletonPlaceholder.Item flexDirection="row">
          {Array(2)
            .fill(1)
            .map((i, index) => (
              <SkeletonPlaceholder.Item
                width={wp(25)}
                height={hp(6)}
                marginVertical={hp(1)}
                marginHorizontal={wp(2)}
                borderRadius={hp(3)}
              />
            ))}
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          width={wp(96)}
          height={hp(6)}
          marginVertical={hp(1)}
          marginHorizontal={wp(2)}
          borderRadius={wp(1)}
        />
      </SkeletonPlaceholder>
    </>
  );
};

export default ProductDetailShimmer;
