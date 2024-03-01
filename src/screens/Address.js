/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RadioButton, Icon, TextInput} from 'react-native-paper';

import Header from '../components/Header';
import {RectButton} from 'react-native-gesture-handler';

// image
// import ima_rightArrow from '../asserts/Image/ima_rightArrow.png';
// import ic_add from '../asserts/Image/ic_add.png';
// import radio_button from '../asserts/Image/radio_button.png';

const Address = ({navigation}) => {
  const [checked, setChecked] = useState('');

  return (
    <View style={styles.container}>
      <Header
        navAction="back"
        title="Shipping Address"
        titleStyle={{fontSize: wp(4.8), fontFamily: 'Montserrat-Regular'}}
      />

      <View style={styles.homeContainer}>
        <FlatList
          data={[1, 2]}
          renderItem={({item}) => (
            <View style={styles.itemBox}>
              <Text style={styles.itemText}>Kapil</Text>

              <Text style={styles.itemText}>hdyd</Text>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemText}>sn Ac</Text>
                <Text style={styles.itemText}>983</Text>
              </View>

              <TouchableOpacity style={styles.radioButtonTextBox}>
                <RadioButton
                  uncheckedColor="#999"
                  color="#d68088"
                  value={item}
                  status={checked === item ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(item)}
                />
                <Text style={styles.useAsText}>
                  Use as the shipping address
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.toString()}
        />

        {/* <TextInput
          mode="flat"
          label="First Name"
          placeholder="First Name"
          right={<TextInput.Affix text="/100" />}
          style={{
            backgroundColor: 'transparent',
            marginTop: hp(1),
            marginHorizontal: 10,
            marginBottom: 20,
          }}
          outlineColor="#999"
          acti
          activeUnderlineColor="#d68088"
        /> */}
      </View>

      <RectButton
        onPress={() => navigation.navigate('AddShippingAddressScreen')}
        style={{
          position: 'absolute',
          right: 12,
          bottom: 10,
          padding: wp(4),
          borderRadius: wp(10),
          backgroundColor: '#000',
          elevation: 3,
        }}>
        <Icon source="plus" color="#fff" size={20} />
      </RectButton>
    </View>
  );
};

export default Address;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  homeContainer: {
    flex: 1,
  },

  headerBackGroundBox: {
    backgroundColor: '#fff',
  },

  shippingHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
    marginLeft: wp(4),
  },

  InformationText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp(4),
  },
  righArrowImage: {
    height: hp(3),
    width: wp(6),
  },
  addImage: {
    heigh: hp(0.1),
    // width: wp(90),
    aspectRatio: 1 / 1,
  },

  itemBox: {
    marginHorizontal: wp(1.2),
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: wp(2),
    marginVertical: hp(0.5),
    paddingVertical: hp(2),
  },
  itemText: {
    fontSize: wp(4),
    color: '#000',
    marginLeft: wp(8),
  },

  useAsText: {
    fontSize: wp(4),
    color: '#000',
    marginLeft: wp(7),
  },

  readioButtonImage: {
    height: hp(5),
    width: wp(5),
    // position: 'absolute',
  },

  radioButtonTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(8),
    marginTop: hp(2),
  },
});
