/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EntypoIcon from 'react-native-vector-icons/Entypo';

const CustomDD = ({openDropdown, setOpenDropdown, data = [], handleSelect}) => {
  const [list, setList] = useState([...data]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {}, []);

  const handleSearch = text => {
    setSearchText(text);

    let filteredData;
    if (text.trim() === '') {
      filteredData = data;
    } else {
      filteredData = data.filter(
        item => item?.name?.toUpperCase()?.indexOf(text?.toUpperCase()) > -1,
      );
    }

    setList(filteredData);
  };

  const handleClear = () => {
    setSearchText('');
    setList(data);
  };

  return (
    <Modal isVisible>
      <View
        style={{
          backgroundColor: '#fcfcf7',
          flex: 1,
          borderRadius: wp(2),
        }}>
        <TouchableOpacity
          onPress={() => setOpenDropdown(null)}
          style={{alignSelf: 'flex-end', padding: hp(1)}}>
          <EntypoIcon
            name="circle-with-cross"
            size={wp(7)}
            color="rgb(190,0,0)"
          />
        </TouchableOpacity>

        <View
          style={{
            height: hp(6),
            marginHorizontal: wp(4),
            marginTop: hp(2),
            borderWidth: 1,
            borderRadius: wp(1),
            marginBottom: hp(2),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              flex: 1,
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText && (
            <EntypoIcon
              name="circle-with-cross"
              size={wp(7)}
              color="grey"
              style={{marginHorizontal: wp(2)}}
              onPress={handleClear}
            />
          )}
        </View>

        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
        <FlatList
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
          data={list}
          contentContainerStyle={{paddingBottom: hp(2)}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                marginHorizontal: wp(4),
                flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#333',
                  paddingVertical: hp(1.5),
                  fontSize: wp(4),
                  fontFamily: 'Montserrat-Medium',
                  textTransform: 'uppercase',
                }}>
                {item?.name}{' '}
              </Text>

              <Text
                style={{
                  color: '#4c4',
                  paddingVertical: hp(1.5),
                  fontSize: wp(4),
                  fontFamily: 'Montserrat-SemiBold',
                  textTransform: 'uppercase',
                }}>
                ({item?.code})
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: '#555',
                marginHorizontal: wp(4),
              }}
            />
          )}
        />
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
};

export default CustomDD;

const styles = StyleSheet.create({});
