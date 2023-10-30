import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';

const HomeBannerShimmer = () => {
  const shimmerFirst = useSelector(state => state.home.shimmerFirst);
  return shimmerFirst ? (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        height={290}
        width={wp(80)}
        borderRadius={4}
        alignSelf="center"
        marginVertical={hp(0.5)}
      />
    </SkeletonPlaceholder>
  ) : (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        height={290}
        width={wp(100)}
        borderRadius={4}
        alignSelf="center"
        marginVertical={hp(0.5)}
      />
    </SkeletonPlaceholder>
  );
};

export default HomeBannerShimmer;
