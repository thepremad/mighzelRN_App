/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';
import RNGoSell from '@tap-payments/gosell-sdk-react-native';
const {
  Languages,
  PaymentTypes,
  AllowedCadTypes,
  TrxMode,
  SDKMode,
  UiDisplayModes,
} = RNGoSell.goSellSDKModels;

// const paymentitems = [
//   {
//     amount_per_unit: 0,
//     description: 'Item 1 Apple',
//     discount: {
//       type: 'F',
//       value: 0,
//       maximum_fee: 0,
//       minimum_fee: 0,
//     },
//     name: 'item1',
//     quantity: {
//       value: 1,
//     },
//     taxes: [
//       {
//         name: 'tax1',
//         description: 'tax describtion',
//         amount: {
//           type: 'F',
//           value: 0,
//           maximum_fee: 0,
//           minimum_fee: 0,
//         },
//       },
//     ],
//     total_amount: 0,
//   },
// ];

// const taxes = [
//   {
//     name: 'tax1',
//     description: 'tax describtion',
//     amount: {type: 'F', value: 0, maximum_fee: 0, minimum_fee: 0},
//   },
// ];

const customer = {
  // Here we can set the customer object as on of the available options on this URL:
  // See [https://github.com/Tap-Payments/gosellSDK-ReactNative#customer] to get more details of setting the customer
  isdNumber: '965',
  number: '00000000',
  customerId: '',
  first_name: 'test',
  middle_name: 'test',
  last_name: 'test',
  email: 'test@test.com',
};
// const paymentReference = {
//   track: 'track',
//   payment: 'payment',
//   gateway: 'gateway',
//   acquirer: 'acquirer',
//   transaction: 'trans_910101',
//   order: 'order_262625',
//   gosellID: null,
// };

const allConfigurations = totalAmount => {
  const appCredentials = {
    //   production_secrete_key:
    //     Platform.OS == 'ios' ? 'iOS-Live-KEY' : 'sk_live_ZwpjAmBd3Hf1zS7EiCP9rx8g',
    language: Languages.EN,
    sandbox_secrete_key:
      Platform.OS == 'ios'
        ? 'iOS-SANDBOX-KEY'
        : 'sk_test_L4y8obVBrTICKMDFxqEQS6R7',
    bundleID: Platform.OS == 'ios' ? 'iOS-PACKAGE-NAME' : 'com.mighzal',
  };

  const transactionCurrency = 'kwd';
  const shipping = [
    {
      name: 'shipping 1',
      description: 'shiping description 1',
      amount: Number(totalAmount), // main amount for payment
    },
  ];

  return {
    appCredentials: appCredentials,
    sessionParameters: {
      paymentStatementDescriptor: 'paymentStatementDescriptor',
      transactionCurrency,
      isUserAllowedToSaveCard: true,
      paymentType: PaymentTypes.ALL,
      amount: '',
      shipping: shipping,
      allowedCadTypes: AllowedCadTypes.ALL,
      // paymenMetaData: {a: 'a meta', b: 'b meta'},
      // applePayMerchantID: 'merchant.applePayMerchantID',
      authorizeAction: {timeInHours: 10, time: 10, type: 'CAPTURE'},
      cardHolderName: '',
      editCardHolderName: true,
      postURL: 'https://tap.company',
      paymentDescription: 'paymentDescription',
      destinations: 'null',
      // Here we can set the transaction mode as on of the available options on this URL:
      // See [https://github.com/Tap-Payments/gosellSDK-ReactNative#transaction_modes] to get transaction modes
      trxMode: TrxMode.PURCHASE,
      // taxes: taxes,
      merchantID: '',
      SDKMode: SDKMode.Sandbox,
      // customer: customer,
      isRequires3DSecure: false,
      receiptSettings: {id: null, email: false, sms: true},
      allowsToSaveSameCardMoreThanOnce: false,
      // paymentReference: paymentReference,
      uiDisplayMode: UiDisplayModes.LIGHT,
    },
  };
};

export default allConfigurations;
