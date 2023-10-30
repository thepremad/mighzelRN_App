/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';

// image
// import ima_leftArrow from '../asserts/Image/ima_leftArrow.png';
// import ic_rightArrow from '../asserts/Image/ic_rightArrow.png';
const AddressAddNewShipping = ({navigation}) => {
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    street_name: '',
    apartment: '',
    city: '',
    zip_code: '',
    country: '',
    state: '',
    phone: '',
  });

  const handleInputs = (value, key) => {
    setInputs({...inputs, [key]: value});
  };

  const handleSave = () => {
    console.log(inputs);
  };

  return (
    <View style={styles.container}>
      <Header
        navAction="back"
        title="Add New Shipping Address"
        titleStyle={{fontSize: wp(4.8), fontWeight: '400'}}
        style={{marginBottom: hp(3)}}
      />

      <ScrollView contentContainerStyle={{paddingBottom: hp(3)}}>
        <View style={styles.homeContainer}>
          <TextInput
            mode="flat"
            label="First Name"
            placeholder="Enter First Name"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'first_name')}
            value={inputs.first_name}
          />

          <TextInput
            mode="flat"
            label="Last Name"
            placeholder="Enter Last Name"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'last_name')}
            value={inputs.last_name}
          />

          <TextInput
            mode="flat"
            label="Street Name"
            placeholder="Enter House number and street name"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'street_name')}
            value={inputs.street_name}
          />

          <TextInput
            mode="flat"
            label="Apartment"
            placeholder="Apartment, suite, until etc.(optional)"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'apartment')}
            value={inputs.apartment}
          />

          <TextInput
            mode="flat"
            label="City"
            placeholder="Enter City"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'city')}
            value={inputs.city}
          />

          <TextInput
            mode="flat"
            label="Zip Code(Postal Code)"
            placeholder="Enter Zip Code"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'zip_code')}
            value={inputs.zip_code}
          />

          <TouchableOpacity style={styles.selecCityBox}>
            <Text style={{fontSize: wp(4), color: '#4F4848'}}>
              Select Country
            </Text>
            <AntDesign name="right" color="#000" size={wp(5)} />
          </TouchableOpacity>
          <View style={[styles.lineBox, {marginTop: hp(2)}]} />

          <TouchableOpacity style={styles.selecCityBox}>
            <Text style={{fontSize: wp(4), color: '#4F4848'}}>
              Select State/Province/Region
            </Text>
            <AntDesign name="right" color="#000" size={wp(5)} />
          </TouchableOpacity>
          <View style={[styles.lineBox, {marginTop: hp(2)}]} />

          <TextInput
            mode="flat"
            label="Phone"
            placeholder="Enter Phone"
            placeholderTextColor="#999"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'phone')}
            value={inputs.phone}
          />

          <TouchableOpacity onPress={handleSave} style={styles.saveButtonBox}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressAddNewShipping;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
  },

  InformationHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
    marginLeft: wp(4),
  },

  InformationText: {
    color: '#000',
    fontWeight: '400',
    marginLeft: wp(4),
  },
  righArrowImage: {
    height: hp(3),
    width: wp(6),
  },

  firstNameText: {
    fontSize: wp(4),
    color: '#4F4848',
    marginLeft: wp(4),
    // marginTop: hp(4),
  },
  firstNameTextInput: {
    fontSize: wp(4),
    color: '#000',
    fontWeight: '500',
    marginLeft: wp(4),
    marginTop: hp(-1),
  },

  lineBox: {
    height: 0.5,
    backgroundColor: '#bbb',
    marginHorizontal: wp(1.5),
  },

  saveButtonBox: {
    backgroundColor: '#cf8385',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(8),
    marginTop: hp(6.2),
    elevation: 5,
  },

  saveButtonText: {
    fontSize: wp(4),
    color: '#fff',
    paddingVertical: hp(2),
    fontWeight: '500',
  },

  rightArrowImage: {
    height: hp(4),
    width: wp(4),
  },

  selecCityBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
});
