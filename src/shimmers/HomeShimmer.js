import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RenderProductShimmer from './RenderProductShimmer';
const HomeShimmer = ({children}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[1]}
        renderItem={({item, index}) => (
          <View style={{flex: 1}}>
            {children}

            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                height={hp(2)}
                width={wp(40)}
                borderRadius={4}
                alignSelf="center"
                marginVertical={hp(2)}
              />
            </SkeletonPlaceholder>

            <RenderProductShimmer center />

            <SkeletonPlaceholder>
              <TouchableOpacity
                style={{
                  height: hp(5.6),
                  marginHorizontal: wp(30),
                  borderWidth: 1,
                  marginVertical: hp(2),
                  borderRadius: wp(1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SkeletonPlaceholder.Item
                  height={hp(2)}
                  width={'70%'}
                  borderRadius={4}
                  alignSelf="center"
                  marginVertical={hp(0.5)}
                />
              </TouchableOpacity>
            </SkeletonPlaceholder>
          </View>
        )}
      />
    </View>
  );
};

export default HomeShimmer;
