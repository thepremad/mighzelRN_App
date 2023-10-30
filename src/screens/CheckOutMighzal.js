/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {RadioButton} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';

const CheckOutMighzal = () => {
  const [selected, setSelected] = useState('');
  const [select, setSelect] = useState('');

  const button1 = () => {
    setSelected('cash');
  };
  const button2 = () => {
    setSelected('pay');
  };

  const button3 = () => {
    setSelect('null');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{margin: hp(0.8)}}>
        <Text
          style={{
            color: '#000000',
            fontWeight: '500',
            margin: hp(1),
            fontSize: wp(4.5),
          }}>
          Additional Information
        </Text>

        <Text
          style={{
            color: '#000000',
            fontWeight: '300',
            marginHorizontal: hp(1),
            marginBottom: hp(0.5),
            marginTop: hp(1.5),
          }}>
          ADD A NOTE TO YOUR ORDER (OPTIONAL)
        </Text>

        <TextInput
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: hp(0.5),
            elevation: 3,
          }}
        />

        <View
          style={{
            marginVertical: hp(3),
            backgroundColor: '#fff',
            elevation: 3,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: wp(5),
              fontWeight: '500',
              color: '#000000',
              marginVertical: hp(1),
            }}>
            Your Order
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(1),
              justifyContent: 'space-between',
              marginHorizontal: wp(2.5),
            }}>
            <Text style={{color: '#000000', fontSize: wp(4)}}>Order</Text>
            <Text style={{color: '#000000', fontSize: wp(4)}}>30.00</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(1),
              justifyContent: 'space-between',
              marginHorizontal: wp(2.5),
            }}>
            <Text style={{color: '#000000', fontSize: wp(4)}}>Delivery</Text>
            <Text style={{color: '#000000', fontSize: wp(4)}}>0.00</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(1),
              justifyContent: 'space-between',
              marginHorizontal: wp(2.5),
            }}>
            <Text
              style={{color: '#000000', fontSize: wp(4), fontWeight: '500'}}>
              Summary
            </Text>
            <Text
              style={{color: '#000000', fontSize: wp(4), fontWeight: '500'}}>
              30.00
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff', elevation: 5}}>
          <Text
            style={{
              color: '#000000',
              fontWeight: '500',
              marginVertical: hp(1.2),
              fontSize: wp(4),
              marginHorizontal: wp(2.5),
            }}>
            Shipping address
          </Text>
        </View>

        <RectButton
          rippleColor={'#B04F58'}
          style={{
            height: hp(7),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: wp(4),
            marginVertical: hp(2.5),
            borderRadius: wp(1.5),
            backgroundColor: '#d68088',
            elevation: 8,
          }}>
          <Text style={{fontSize: wp(4.5), fontWeight: '500', color: '#fff'}}>
            Add Shipping Address
          </Text>
        </RectButton>

        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: hp(3),
            elevation: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(10),
              marginTop: hp(2),
              // flex: 1,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{color: '#000', fontWeight: '300', fontSize: wp(4.2)}}>
                First Name
              </Text>

              <Text
                style={{color: '#000', fontWeight: '300', fontSize: wp(4.2)}}>
                Street Name
              </Text>
              <Text
                style={{color: '#000', fontWeight: '300', fontSize: wp(4.2)}}>
                Apartment
              </Text>
            </View>

            <View>
              <RectButton rippleColor={'#f1f1f1'}>
                <Text
                  onPress={() => alert('hii')}
                  style={{
                    color: '#EEA0A0',
                    fontWeight: '300',
                    fontSize: wp(4.2),
                  }}>
                  Change
                </Text>
              </RectButton>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(3),
              alignItems: 'center',
              marginLeft: wp(10),
            }}>
            <RadioButton
              uncheckedColor="#999"
              color="#d68088"
              value={select}
              status={select ? 'checked' : 'unchecked'}
              // onPress={() => setChecked(item)}
            />
            <Text style={[styles.radioButtonText, {fontWeight: '400'}]}>
              Select as a shippping address
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: hp(3),
            elevation: 3,
          }}>
          <Text
            style={{
              color: '#000000',
              fontWeight: '500',
              marginTop: hp(1.2),
              fontSize: wp(4),
              marginHorizontal: wp(2.5),
            }}>
            Payment
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(3),
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginLeft: wp(10)}} onPress={button1}>
              <RadioButton
                uncheckedColor="#999"
                color="#d68088"
                value={true}
                status={true ? 'checked' : 'unchecked'}
                // onPress={() => setChecked(item)}
              />
            </TouchableOpacity>
            <Text style={styles.radioButtonText}>
              Cash on delivery (kumait only)
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(3),
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginLeft: wp(10)}} onPress={button2}>
              <RadioButton
                uncheckedColor="#999"
                color="#d68088"
                value={true}
                status={true ? 'checked' : 'unchecked'}
                // onPress={() => setChecked(item)}
              />
            </TouchableOpacity>
            <Text style={styles.radioButtonText}>
              Pay by Debit/Credit card only
            </Text>
          </View>
        </View>

        <RectButton
          rippleColor={'#B04F58'}
          style={{
            height: hp(7),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: wp(4),
            marginVertical: hp(2.5),
            borderRadius: wp(1.5),
            backgroundColor: '#d68088',
            elevation: 8,
          }}>
          <Text style={{fontSize: wp(4.5), fontWeight: '500', color: '#fff'}}>
            Submit Order
          </Text>
        </RectButton>
      </ScrollView>
    </View>
  );
};

export default CheckOutMighzal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  radiobuttonImage: {
    height: wp(7),
    aspectRatio: 1 / 1,
  },

  radioButtonText: {
    alignSelf: 'center',
    fontSize: wp(4.2),
    fontWeight: '300',
    color: '#000000',
    marginLeft: wp(8),
  },
});
