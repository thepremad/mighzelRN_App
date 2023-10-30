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

const CartShimmer = () => {
  const data = [1, 2, 3, 4];
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <SkeletonPlaceholder backgroundColor="#eee" highlightColor="#fff">
            <SkeletonPlaceholder.Item
              height={hp(6)}
              marginVertical={hp(2)}
              marginHorizontal={wp(3)}
              borderBottomWidth={2}
              justifyContent="center">
              <SkeletonPlaceholder.Item width={wp(30)} height={hp(2)} />
              <SkeletonPlaceholder.Item
                style={{
                  backgroundColor: '#d68088',
                  marginVertical: hp(2),
                  alignSelf: 'flex-end',
                  paddingVertical: hp(1.3),
                  paddingHorizontal: wp(3.5),
                  borderRadius: wp(2),
                  elevation: 8,
                  position: 'absolute',
                  right: 10,
                  top: -15,
                  borderWidth: 1,
                }}>
                <SkeletonPlaceholder.Item width={wp(20)} height={hp(2)} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
        renderItem={({item}) => (
          <SkeletonPlaceholder backgroundColor="#eee" highlightColor="#fff">
            <SkeletonPlaceholder.Item
              style={{
                height: hp(50),
                elevation: 3,
                borderRadius: wp(1),
                marginVertical: hp(1.5),
                marginHorizontal: wp(3),
                borderWidth: 1,
                borderColor: '#E1E9EE',
              }}>
              <SkeletonPlaceholder.Item
                height={hp(2)}
                width={wp(30)}
                borderRadius={4}
                marginLeft={wp(3)}
                marginVertical={hp(0.5)}
                marginTop={hp(1)}
              />
              <SkeletonPlaceholder.Item
                style={{flexDirection: 'row', marginTop: hp(1)}}>
                <SkeletonPlaceholder.Item height={hp(12)} width={hp(12)} />

                <SkeletonPlaceholder.Item
                  style={{
                    justifyContent: 'space-between',
                    marginLeft: wp(6),
                  }}>
                  <SkeletonPlaceholder.Item
                    height={hp(3)}
                    width={wp(50)}
                    borderBottomLeftRadius={wp(1)}
                    marginTop={hp(3)}
                  />
                  <SkeletonPlaceholder.Item
                    height={hp(2)}
                    width={wp(20)}
                    borderBottomLeftRadius={wp(1)}
                    marginBottom={hp(1)}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
        contentContainerStyle={wp(100)}
      />
    </View>
  );
};

export default CartShimmer;
