import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
// import Header from './components/Header';
import RNGoSell from '@tap-payments/gosell-sdk-react-native';
import sdkConfigurations from './sdkConfigurations';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';
import {showSnack} from '../components/Snackbar';

export default class PaymentUI extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.startSDK = this.startSDK.bind(this);
    this.handleResult = this.handleResult.bind(this);

    if (!this.sdkModule && RNGoSell && RNGoSell.goSellSDK) {
      this.sdkModule = RNGoSell.goSellSDK;
    }

    if (!this.sdkModule && RNGoSell && RNGoSell.goSellSDKModels) {
      this.sdkModels = RNGoSell.goSellSDKModels;
    }

    this.subscription = RNGoSell.goSellListener.addListener(
      RNGoSell.goSellSDKModels.Listener.paymentInit,
      charge => {
        console.log('goSellListener.addListener', charge);
        //OUTPUT :  {
        //   card_exp_month: null,
        //   source_object: 'token',
        //   card_brand: null,
        //   customer_email: 'test@test.com',
        //   status: 'INITIATED',
        //   card_last_four: '0008',
        //   sdk_result: 'SUCCESS',
        //   source_payment_type: null,
        //   customer_last_name: 'test',
        //   customer_middle_name: null,
        //   message: 'Initiated',
        //   trx_mode: 'CHARGE',
        //   card_first_six: '512345',
        //   charge_id: 'chg_TS01A2020230849o1M40512193',
        //   card_object: 'card',
        //   customer_id: null,
        //   description: 'testDescriptor.',
        //   card_exp_year: null,
        //   source_id: 'tok_O3qx14235495ucd5UK112696',
        //   customer_first_name: 'test',
        // };
      },
    );
  }

  componentWillUnmount() {
    this.subscription.remove(); // to clear the listener
  }

  startSDK() {
    console.log('startSDK()');
    const startPayment = (createOrder, setLoader) => {
      console.log('startPayment()', this.sdkModule);
      setLoader(true);

      if (this.sdkModule) {
        this.sdkModule.startPayment(
          sdkConfigurations(this.props.amount, this.props.customer),
          0,
          (error, status) => {
            setLoader(false);
            this.handleResult(error, status, createOrder, setLoader);
          },
        );
      } else {
        setLoader(false);
        showSnack('Some error occurred!', null, true);
      }
    };

    this.props.handleSubmit(startPayment);
  }

  handleResult(error, status, createOrder, setLoader) {
    var myString = JSON.stringify(status, null, 2);
    var resultStr = String(status.sdk_result);
    switch (resultStr) {
      case 'SUCCESS':
        createOrder(status);
        break;
      case 'FAILED':
        showSnack('Transaction failed', null, true);
        break;
      case 'SDK_ERROR':
        showSnack(status.sdk_error_message, null, true);
        break;
      case 'NOT_IMPLEMENTED':
        break;
    }
  }

  render() {
    return (
      <RectButton
        onPress={this.startSDK}
        rippleColor={'#B04F58'}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </RectButton>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginVertical: hp(2.5),
    borderRadius: wp(1.5),
    backgroundColor: '#d68088',
    elevation: 8,
  },
  buttonText: {
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
  },
});
