/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useMemo, memo, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
// import {useIsFocused} from '@react-navigation/native';

import Fontisto from 'react-native-vector-icons/Fontisto';

import {async_keys, getData} from '../storage/UserPreference';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchHomeDataSecondRequest,
  fetchHomeDataThirdRequest,
} from '../redux/action/homeActions';

import img_headerLogo from '../assets/images/home_header_logo.png';
// import img_headerLogo from '../assets/images/Master-Logo.png';
import RenderProducts from '../components/RenderProducts';
import HomeShimmer from '../shimmers/HomeShimmer';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [bannerLoader, setBannerLoader] = useState(true);
  const [bannerList, setBannerList] = useState([
    {
      id: 1,
      image:
        'https://mighzalalarab.com/wp-content/uploads/2023/08/DSC_0057-1367x2048.jpg',
    },
    {
      id: 2,
      image:
        'https://mighzalalarab.com/wp-content/uploads/2023/08/DSC_0080-1367x2048.jpg',
    },
    {
      id: 3,
      image:
        'https://mighzalalarab.com/wp-content/uploads/2023/08/DSC_0080-1367x2048.jpg',
    },
  ]);
  // const [newArrival, setNewArrival] = useState([
  //   {
  //     id: 1,
  //     image:
  //       'https://mighzalalarab.com/wp-content/uploads/2023/10/IMG_8356.jpg',
  //     name: 'CHONA HALO STUDS',
  //     price: '10.00 KWD',
  //     dropPrice: null,
  //   },
  //   {
  //     id: 2,
  //     image:
  //       'https://mighzalalarab.com/wp-content/uploads/2023/10/IMG_8356.jpg',
  //     name: 'BLOSSOMS STUD EARRINGS',
  //     price: '10.00 KWD',
  //     dropPrice: null,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       'https://mighzalalarab.com/wp-content/uploads/2023/10/IMG_8356.jpg',
  //     name: 'BEXLEY RING',
  //     price: '10.00 KWD',
  //     dropPrice: '10.00 KWD',
  //   },
  //   {
  //     id: 4,
  //     image:
  //       'https://mighzalalarab.com/wp-content/uploads/2023/10/IMG_8356.jpg',
  //     name: 'MHARLI NECKLACE AND EARRING SET',
  //     price: '45.00 KWD',
  //     dropPrice: null,
  //   },
  // ]);

  // const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const {
    homeDataFirst,
    homeDataSecond,
    homeDataThird,
    // isLoadingFirst,
    // isLoadingSecond,
    // isLoadingThird,
    shimmerFirst,
    shimmerSecond,
    shimmerThird,
    // errorFirst,
    // errorSecond,
    // errorThird,
  } = useSelector(state => state.home);

  // console.log(homeDataFirst);

  // console.log('HOME_ERROR', {
  //   errorFirst,
  //   errorSecond,
  //   errorThird,
  // });

  useEffect(() => {
    const fetchName = async () => {
      const name = await getData(async_keys.user_display_name);
      setDisplayName(name);
    };
    fetchName();
    const timeOutID = setTimeout(() => setBannerLoader(false), 1000);

    return () => clearTimeout(timeOutID);
  }, []);

  useEffect(() => {
    dispatch(fetchHomeDataSecondRequest());
  }, [dispatch]);

  const renderItem = ({item}) => {
    return (
      <FastImage
        source={{
          uri: item.image,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.normal,
        }}
        defaultSource={require('../assets/images/product_placeholder_image.png')}
        resizeMode="cover"
        style={{height: 290, width: 300, marginVertical: hp(1)}}
      />
    );
  };

  const handleSearch = () => navigation.navigate('SearchScreen-Home');

  const handleProductMighzal = useCallback(
    item => {
      const {category_id, category_name} = item;
      navigation.navigate('ProductList-Home', {
        category_id,
        category_name,
      });
    },
    [navigation],
  );

  const Header = ({title, name}) => (
    <View style={[headerStyles.header]}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

      <Image
        source={img_headerLogo}
        style={{width: wp(40), aspectRatio: 4041 / 970}}
        resizeMode="stretch"
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          numberOfLines={2}
          style={{
            color: '#d68088',
            textTransform: 'uppercase',
            marginRight: wp(4),
            width: wp(25),
            fontSize: wp(3.4),
          }}>
          WELCOME{name ? '\n' + name : null}
        </Text>
        <TouchableOpacity
          style={{
            padding: wp(1.5),
            marginLeft: wp(1),
          }}
          onPress={handleSearch}>
          <Fontisto name="search" color="#d68088" size={wp(5)} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const headerStyles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp(4),
      paddingVertical: hp(1),
      backgroundColor: '#fff',
    },
    headerTitle: {
      color: '#000',
      fontSize: wp(4),
      marginLeft: wp(6),
    },
  });

  // const onEndReached = () => {
  //   if (Object.keys(homeDataSecond).length < 1) {
  //     dispatch(fetchHomeDataSecondRequest());
  //   } else if (Object.keys(homeDataThird).length < 1) {
  //     dispatch(fetchHomeDataThirdRequest());
  //   }
  // };

  const RenderHomeItem = useMemo(
    () =>
      memo(({item}) => {
        // console.log('<RenderHomeItem />');
        return (
          <View style={{flex: 1}}>
            {/* {item?.category_name === 'Mix n Match' && (
              <Carousel
                autoplay={true}
                activeSlideAlignment="center"
                loop={true}
                data={bannerList}
                renderItem={renderItem}
                sliderWidth={wp(100)}
                itemWidth={300}
                inactiveSlideOpacity={1}
              />
            )} */}

            {item?.category_name !== 'Mix n Match' && (
              <FastImage
                source={{
                  uri: item?.image,
                  cache: FastImage.cacheControl.immutable,
                  priority: FastImage.priority.normal,
                }}
                style={{
                  width: wp(100),
                  height: wp(75),
                  marginVertical: hp(2),
                }}
              />
            )}

            <Text style={styles.titleText}>{item?.category_name}</Text>

            <FlatList
              scrollEnabled={false}
              data={item?.product_data}
              keyExtractor={i => i?.product_id?.toString()}
              renderItem={i => {
                return <RenderProducts item={i.item} />;
              }}
              numColumns={2}
              // disableVirtualization={true}

              // removeClippedSubviews={true}
            />

            <TouchableOpacity
              onPress={() => handleProductMighzal(item)}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>View Full Collection</Text>
            </TouchableOpacity>
          </View>
        );
      }),
    [handleProductMighzal],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" name={displayName} />
      <ScrollView>
        <View style={styles.homeContainer}>
          {/* <FlatList
          data={[homeDataFirst, homeDataSecond, homeDataThird].filter(
            item => item && Object.keys(item).length > 0,
          )}
          renderItem={({item, index}) => <RenderHomeItem item={item} />}
          ListFooterComponent={() =>
            (shimmerFirst || shimmerSecond || shimmerThird) && <HomeShimmer />
          }
          // onEndReached={onEndReached}
          keyExtractor={item => item?.category_id?.toString()}
          disableVirtualization={true}
          // removeClippedSubviews={true}
        /> */}

          {!bannerLoader || !shimmerFirst ? (
            <Carousel
              autoplay={true}
              activeSlideAlignment="center"
              loop={true}
              data={bannerList}
              renderItem={renderItem}
              sliderWidth={wp(100)}
              itemWidth={300}
              inactiveSlideOpacity={1}
            />
          ) : (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                height={290}
                width={wp(80)}
                borderRadius={4}
                alignSelf="center"
                marginVertical={hp(0.5)}
              />
            </SkeletonPlaceholder>
          )}
          {bannerLoader ? (
            <HomeShimmer />
          ) : (
            [homeDataFirst, homeDataSecond, homeDataThird]
              .filter(item => item && Object.keys(item).length > 0)
              .map((item, index) => <RenderHomeItem key={index} item={item} />)
          )}
          {(shimmerFirst || shimmerSecond || shimmerThird) && (
            <HomeShimmer>
              {!shimmerFirst && (
                <SkeletonPlaceholder borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    height={290}
                    width={wp(100)}
                    borderRadius={4}
                    alignSelf="center"
                    marginVertical={hp(0.5)}
                  />
                </SkeletonPlaceholder>
              )}
            </HomeShimmer>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: wp(5),
    color: '#cf8385',
    textAlign: 'center',
    marginVertical: hp(2),
    fontFamily: 'Roboto-Bold',
  },
  buttonContainer: {
    height: hp(5.6),
    marginHorizontal: wp(30),
    borderWidth: 1,
    marginVertical: hp(2),
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#cf8385',
  },
  buttonText: {
    fontSize: wp(3.9),
    fontFamily: 'Roboto-Medium',
    color: '#cf8385',
    textAlign: 'center',
  },
});
