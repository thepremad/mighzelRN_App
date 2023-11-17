import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const RenderProductShimmer = ({center}) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return center ? (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={wp(46)}
            marginHorizontal={wp(2)}
            marginTop={hp(2)}
            height={hp(18)}
          />
          <SkeletonPlaceholder.Item
            height={hp(1.5)}
            width={wp(40)}
            borderRadius={4}
            alignSelf="center"
            marginVertical={hp(0.5)}
          />
          <SkeletonPlaceholder.Item
            height={hp(1.5)}
            width={wp(28)}
            borderRadius={4}
            alignSelf="center"
            marginVertical={hp(0.5)}
            marginBottom={hp(2)}
          />
        </SkeletonPlaceholder>
      )}
      contentContainerStyle={wp(100)}
    />
  ) : (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={wp(46)}
            marginHorizontal={wp(2)}
            marginTop={hp(2)}
            height={hp(18)}
          />
          <SkeletonPlaceholder.Item
            height={hp(1.5)}
            width={wp(40)}
            borderRadius={4}
            marginVertical={hp(0.5)}
            marginHorizontal={wp(2)}
          />
          <SkeletonPlaceholder.Item
            height={hp(1.5)}
            width={wp(28)}
            borderRadius={4}
            marginVertical={hp(0.5)}
            marginBottom={hp(2)}
            marginHorizontal={wp(2)}
          />
        </SkeletonPlaceholder>
      )}
      contentContainerStyle={wp(100)}
    />
  );
};

export default RenderProductShimmer;

const styles = StyleSheet.create({
  container: {
    width: '46%',
    marginHorizontal: '2%',
    marginVertical: hp(2),
  },
  image: {
    width: '100%',
    height: hp(18),
  },
  nameText: {
    fontSize: wp(3.8),
    color: '#000',
    fontFamily: 'Roboto-Light',
    textTransform: 'capitalize',
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
  },
});
