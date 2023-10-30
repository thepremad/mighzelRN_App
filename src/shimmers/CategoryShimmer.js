/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CategoryShimmer = () => {
  const data = [1, 2, 3, 4];
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item
              height={hp(17)}
              borderRadius={wp(3)}
              marginHorizontal={wp(3)}
            />
          </SkeletonPlaceholder>
        )}
        renderItem={({item}) => (
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                height: hp(17),
                elevation: 3,
                borderRadius: wp(1),
                marginVertical: hp(1.5),
                marginHorizontal: wp(3),
                justifyContent: 'space-between',
                borderWidth: 2,
                borderColor: '#E1E9EE',
              }}>
              <SkeletonPlaceholder.Item
                height={hp(2.5)}
                width={wp(40)}
                borderRadius={4}
                alignSelf="center"
                marginLeft={wp(5)}
              />
              <SkeletonPlaceholder.Item
                height={hp(17)}
                width={hp(17)}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
        contentContainerStyle={wp(100)}
      />
    </View>
  );
};

export default CategoryShimmer;
