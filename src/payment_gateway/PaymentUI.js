import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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
    this.state = {
      statusNow: 'not started',
      result: '',
      paymentLoader: false,
    };
    this.changeState = this.changeState.bind(this);
    this.startSDK = this.startSDK.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleSDKResult = this.handleSDKResult.bind(this);
    this.printSDKResult = this.printSDKResult.bind(this);

    if (!this.sdkModule && RNGoSell && RNGoSell.goSellSDK) {
      this.sdkModule = RNGoSell.goSellSDK;
    }
    if (!this.sdkModule && RNGoSell && RNGoSell.goSellSDKModels) {
      this.sdkModels = RNGoSell.goSellSDKModels;
    }
    this.subscription = RNGoSell.goSellListener.addListener(
      RNGoSell.goSellSDKModels.Listener.paymentInit,
      charge => {
        console.log(charge);
      },
    );
  }

  componentWillUnmount() {
    this.subscription.remove(); // to clear the listener
  }

  startSDK() {
    const startPayment = (createOrder, setLoader) => {
      setLoader(true);

      if (this.sdkModule) {
        // this.setState({paymentLoader: true});
        this.sdkModule.startPayment(
          sdkConfigurations(this.props.amount),
          0,
          (error, status) =>
            this.handleResult(error, status, createOrder, setLoader),
        );
      } else {
        showSnack('Some error occurred!', null, true);
      }
    };
    this.props.handleSubmit(startPayment);
  }

  handleResult(error, status, createOrder, setLoader) {
    setLoader(false);
    // this.setState({paymentLoader: false});
    var myString = JSON.stringify(status, null, 2);
    console.log(myString);
    var resultStr = String(status.sdk_result);
    switch (resultStr) {
      case 'SUCCESS':
        createOrder();
        break;
      case 'FAILED':
        this.handleSDKResult(status);
        break;
      case 'SDK_ERROR':
        console.log('sdk error............');
        console.log(status['sdk_error_code']);
        console.log(status['sdk_error_message']);
        console.log(status['sdk_error_description']);
        console.log('sdk error............');
        break;
      case 'NOT_IMPLEMENTED':
        break;
    }
    this.changeState(resultStr, myString, () => {
      console.log('done');
    });
  }

  handleSDKResult(result) {
    console.log('trx_mode::::');
    console.log(result['trx_mode']);
    switch (result['trx_mode']) {
      case 'CHARGE':
        console.log('Charge');
        console.log(result);
        this.printSDKResult(result);
        break;

      case 'AUTHORIZE':
        this.printSDKResult(result);
        break;

      case 'SAVE_CARD':
        this.printSDKResult(result);
        break;

      case 'TOKENIZE':
        Object.keys(result).map(key => {
          console.log(`TOKENIZE \t${key}:\t\t\t${JSON.stringify(result[key])}`);
        });

        // responseID = tapSDKResult['token'];
        break;
    }
  }

  printSDKResult(result) {
    if (!result) return;
    Object.keys(result).map(key => {
      console.log(`${result['trx_mode']}\t${key}:\t\t\t${result[key]}`);
    });
  }

  changeState(newName, resultValue, callback) {
    console.log('the new value is' + newName);
    this.setState(
      {
        statusNow: newName,
        result: resultValue,
      },
      callback,
    );
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
    fontFamily: 'Roboto-Medium',
    color: '#fff',
  },
});
