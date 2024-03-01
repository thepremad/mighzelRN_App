import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {RectButton} from 'react-native-gesture-handler';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrderListShimmer = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      renderItem={({item, index}) => (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            marginHorizontal={wp(1)}
            marginVertical={hp(0.5)}
            borderRadius={wp(1)}
            borderWidth={2}
            borderColor="#E1E9EE"
            height={hp(18)}
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal={wp(2)}>
            <SkeletonPlaceholder.Item
              marginVertical={hp(1)}
              justifyContent="center">
              <SkeletonPlaceholder.Item
                width={wp(28)}
                height={hp(2)}
                marginVertical={hp(0.7)}
              />
              <SkeletonPlaceholder.Item
                width={wp(35)}
                height={hp(2)}
                marginVertical={hp(0.7)}
              />
              <SkeletonPlaceholder.Item
                width={wp(31)}
                height={hp(2)}
                marginVertical={hp(0.7)}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item justifyContent="space-between">
              <SkeletonPlaceholder.Item
                width={wp(35)}
                height={hp(2)}
                alignSelf="flex-end"
                marginVertical={hp(0.7)}
              />

              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={wp(40)}
                  height={hp(2)}
                  marginVertical={hp(0.7)}
                />
                <SkeletonPlaceholder.Item
                  width={wp(35)}
                  height={hp(2)}
                  alignSelf="flex-end"
                  marginVertical={hp(0.7)}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
    />
  );
};

export default OrderListShimmer;

const styles = StyleSheet.create({});
