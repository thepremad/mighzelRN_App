/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {ActivityIndicator, RadioButton, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {makeRequest} from '../api/ApiInfo';
import {showSnack} from '../components/Snackbar';
import {async_keys, getData} from '../storage/UserPreference';
import {
  fetchCartDataRequest,
  fetchCartDataSuccess,
} from '../redux/action/cartActions';
import CustomDD from '../components/CustomDD';
import {country_list} from '../components/CountryList';

// image
// import ima_leftArrow from '../asserts/Image/ima_leftArrow.png';
// import ic_rightArrow from '../asserts/Image/ic_rightArrow.png';
const AddressAddNewShipping = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address_1: '',
    address_2: '',
    city: '',
    country: '',
    phone: '',
  });
  const dispatch = useDispatch();

  const {cartData, isLoading, error} = useSelector(state => state.cart);

  // console.log('info', {SelectedCountry, stateList});

  useEffect(() => {
    if (cartData?.billing_address) {
      if (Object.keys(cartData?.billing_address)?.length === 0) {
        dispatch(fetchCartDataRequest());
      }
    }
  }, []);

  useEffect(() => {
    const address = cartData?.billing_address;

    if (address['country']) {
      if (
        country_list.filter(item => item.name === address['country'])?.length >
        0
      ) {
        setCountryCode(
          country_list.filter(item => item.name === address['country'])[0]
            .dial_code,
        );
      }
    }

    let obj = {};
    for (let key in inputs) {
      obj = {...obj, [key]: address[key] || ''};
    }
    setInputs(obj);
  }, [isLoading]);

  const handleInputs = (value, key) => {
    setInputs({...inputs, [key]: value});
  };

  const handleSelect = item => {
    setInputs({...inputs, country: item.name});
    setCountryCode(item.dial_code);
    setOpenDropdown(false);
  };

  console.log(inputs);

  const handleSave = async () => {
    let err = false;
    for (let key in inputs) {
      if (inputs[key]?.toString()?.trim() === '') {
        err = true;
        console.log(key);
      }
    }

    if (err) {
      Alert.alert('', 'Please fill all the fields');
      return false;
    }

    try {
      const update = {
        ...cartData,
        billing_address: inputs,
      };
      const customer_id = await getData(async_keys.customer_id);

      setLoader(true);
      const res = await makeRequest(
        `update_shipping_address`,
        {
          ...inputs,
          customer_id,
          type: 'billing',
        },
        true,
      );
      if (res) {
        const {Status, Message} = res;
        if (Status === true) {
          console.log('res', res);
          showSnack(Message);
          dispatch(fetchCartDataSuccess(update));

          if (route.name === 'AddShippingAddressScreen-Cart') {
            navigation.goBack();
          }
        } else {
          showSnack(Message, null, true);
        }
      } else {
        showSnack('Some error occured', null, true);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      showSnack('Some error occured', null, true);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {(isLoading || loader) && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(100),
            width: wp(100),
            zIndex: 9,
          }}>
          <ActivityIndicator color="#d68088" size={'large'} />
        </View>
      )}
      <Header
        navAction="back"
        title={`Add/Edit Billing Address`}
        titleStyle={{fontSize: wp(4.8), fontFamily: 'Montserrat-Regular'}}
        style={{marginBottom: hp(3)}}
      />

      <ScrollView contentContainerStyle={{paddingBottom: hp(3)}}>
        <View style={styles.homeContainer}>
          <TextInput
            mode="flat"
            label="FIRST NAME *"
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
            label="LAST NAME *"
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

          <Text style={{marginTop: hp(1), marginHorizontal: wp(5)}}>
            COUNTRY / REGION *
          </Text>
          <TouchableOpacity
            onPress={() => setOpenDropdown(true)}
            style={styles.selecCityBox}>
            <Text
              style={{
                fontSize: wp(4),
                color: '#4F4848',
                textTransform: 'capitalize',
              }}>
              {inputs.country || 'Select Country'}
            </Text>
            <AntDesign name="down" color="#4F4848" size={wp(5)} />

            {openDropdown && (
              <CustomDD
                data={country_list}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                handleSelect={handleSelect}
              />
            )}
          </TouchableOpacity>
          <View style={[styles.lineBox]} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginHorizontal: wp(5.5),
            }}>
            {countryCode && (
              <Text style={{color: '#000', marginLeft: wp(5.5)}}>
                {countryCode}
              </Text>
            )}
            <TextInput
              mode="flat"
              label="PHONE *"
              placeholder="Enter Phone"
              placeholderTextColor="#999"
              style={{
                backgroundColor: 'transparent',
                color: '#000',
                flex: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="#d68088"
              onChangeText={text => handleInputs(text, 'phone')}
              value={inputs.phone}
            />
          </View>
          <View style={[styles.lineBox]} />

          <TextInput
            mode="flat"
            label="APARTMENT NUMBER, VILLA NUMBER, UNIT, ETC. *"
            placeholder="Apartment, suite, until etc.(optional)"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'address_2')}
            value={inputs.address_2}
          />

          <TextInput
            mode="flat"
            label="STREET ADDRESS / BLOCK *"
            placeholder="STREET ADDRESS / BLOCK *"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'address_1')}
            value={inputs.address_1}
          />

          <TextInput
            mode="flat"
            label="AREA / CITY *"
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
            label="EMAIL ADDRESS *"
            placeholder="Enter Email"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'email')}
            value={inputs.email}
          />

          {/* <TextInput
            mode="flat"
            label="Zip Code(Postal Code)"
            placeholder="Enter Zip Code"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: wp(1.5),
            }}
            underlineColor="#bbb"
            activeUnderlineColor="#d68088"
            onChangeText={text => handleInputs(text, 'postcode')}
            value={inputs.postcode}
          /> */}

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
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Medium',
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
    fontFamily: 'Montserrat-Medium',
  },

  rightArrowImage: {
    height: hp(4),
    width: wp(4),
  },

  selecCityBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5.5),
    paddingVertical: hp(2),
  },
});
