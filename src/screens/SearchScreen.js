/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {ActivityIndicator, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';

const SearchScreen = ({navigation, route}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSearch = async text => {
    try {
      setSearchText(text);
      if (text.length > 2) {
        setLoader(true);
        const result = await makeRequest(`search_products?name=${text}`);
        const {Status, Message} = result;
        if (Status === true) {
          const {Data} = result;
          setSearchList(Data);
          setLoader(false);
        } else {
          showSnack(Message, null, true);
        }
      } else {
        setSearchList([]);
      }
    } catch (error) {
      showSnack(
        `Oops, something went wrong please try again later!`,
        null,
        true,
      );
      console.log(error);
    }
  };
  const handleClear = () => {
    setSearchText('');
  };

  const handleSearchedProduct = product_id => {
    console.log('route.name', route.name);
    if (route.name === 'SearchScreen-Category') {
      navigation.navigate('ProductDetails-Category', {product_id});
    } else if (route.name === 'SearchScreen-Home') {
      navigation.navigate('ProductDetails-Home', {product_id});
    }
  };

  return (
    <View style={styles.container}>
      {loader && (
        <View
          style={{
            position: 'absolute',
            height: hp(100),
            width: wp(100),
            zIndex: 99,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <ActivityIndicator color="#d68088" size={'large'} />
        </View>
      )}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{padding: wp(1.5)}}
          activeOpacity={1}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color="#d68088" size={wp(5)} />
        </TouchableOpacity>
      </View>
      <View style={styles.homeContainer}>
        <TextInput
          mode="outlined"
          label=""
          placeholder="Search Product here"
          placeholderTextColor="#999"
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: wp(4),
            marginVertical: hp(2),
          }}
          //   contentStyle={{color: 'red'}}
          underlineColor="#bbb"
          activeUnderlineColor="#d68088"
          activeOutlineColor="#d68088"
          onChangeText={handleSearch}
          value={searchText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          left={
            <TextInput.Icon
              icon={() => (
                <Fontisto
                  name="search"
                  size={wp(5)}
                  color={isFocused ? '#d68088' : '#999'}
                />
              )}
            />
          }
          right={
            <TextInput.Icon
              disabled={!isFocused}
              onPress={handleClear}
              icon={() => (
                <Entypo
                  name="circle-with-cross"
                  size={wp(6)}
                  color={isFocused ? '#d68088' : '#999'}
                />
              )}
            />
          }
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={hp(9)}
          style={{flex: 1}}
          behavior={'height'}>
          <FlatList
            data={searchList}
            renderItem={({item}) => (
              <TouchableHighlight
                underlayColor="#eee"
                onPress={() => handleSearchedProduct(item.product_id)}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Light',
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(4),
                  }}>
                  {item.product_name}
                </Text>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.product_id?.toString()}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={() => (
              <View style={{borderBottomWidth: 0.5, borderColor: '#000'}} />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    paddingTop: hp(2),
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  homeContainer: {
    flex: 1,
  },
});
