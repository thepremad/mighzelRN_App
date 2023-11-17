/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchScreen = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSearch = text => setSearchText(text);
  const handleClear = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
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
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25,
            ]}
            renderItem={({item}) => (
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  marginVertical: hp(1),
                  marginHorizontal: wp(4),
                }}>
                {item}
              </Text>
            )}
            keyExtractor={item => item.toString()}
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
