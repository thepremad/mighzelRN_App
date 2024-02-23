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

const paymentReference = {
  track: 'track',
  payment: 'payment',
  gateway: 'gateway',
  acquirer: 'acquirer',
  transaction: 'test_123',
  order: 'test_123',
  gosellID: null,
};

const allConfigurations = (totalAmount, customer_detail) => {
  const appCredentials = {
    production_secrete_key:
      Platform.OS === 'ios'
        ? 'sk_live_ZwpjAmBd3Hf1zS7EiCP9rx8g'
        : 'sk_live_ZwpjAmBd3Hf1zS7EiCP9rx8g',
    language: Languages.EN,
    sandbox_secrete_key:
      Platform.OS === 'ios'
        ? 'sk_test_XKokBfNWv6FIYuTMg5sLPjhJ'
        : 'sk_test_L4y8obVBrTICKMDFxqEQS6R7',
    // : 'sk_test_L4y8obVBrTICKMDFxqEQS6R7',
    bundleID:
      Platform.OS === 'ios' ? 'com.mighzalalarab.wpEcommerce' : 'com.mighzal',
  };

  const transactionCurrency = 'kwd';
  const shipping = [
    {
      name: 'test 1',
      description: 'test description 1',
      // amount: Number(totalAmount), // main amount for payment
      amount: 0,
    },
  ];

  const customer = {
    // Here we can set the customer object as on of the available options on this URL:
    // See [https://github.com/Tap-Payments/gosellSDK-ReactNative#customer] to get more details of setting the customer
    isdNumber: '',
    number: customer_detail?.phone,
    customerId: '',
    first_name: customer_detail?.first_name,
    middle_name: '',
    last_name: customer_detail?.last_name,
    email: customer_detail?.email,
  };

  return {
    appCredentials: appCredentials,
    sessionParameters: {
      paymentStatementDescriptor: 'testDescriptor.',
      transactionCurrency,
      isUserAllowedToSaveCard: true,
      paymentType: PaymentTypes.ALL,
      amount: totalAmount.toString(),
      shipping: shipping,
      allowedCadTypes: AllowedCadTypes.ALL,
      // paymenMetaData: {a: 'a meta', b: 'b meta'},
      // applePayMerchantID: 'merchant.applePayMerchantID',
      authorizeAction: {timeInHours: 10, time: 10, type: 'CAPTURE'},
      cardHolderName: '',
      editCardHolderName: true,
      postURL: 'https://tap.company',
      paymentDescription: 'testDescription',
      destinations: 'null',
      // Here we can set the transaction mode as on of the available options on this URL:
      // See [https://github.com/Tap-Payments/gosellSDK-ReactNative#transaction_modes] to get transaction modes
      trxMode: TrxMode.PURCHASE,
      // taxes: taxes,
      merchantID: '',
      SDKMode: SDKMode.Sandbox,
      customer: customer,
      isRequires3DSecure: true,
      receiptSettings: {id: null, email: true, sms: false},
      allowsToSaveSameCardMoreThanOnce: false,
      paymentReference: paymentReference,
      uiDisplayMode: UiDisplayModes.LIGHT,
    },
  };
};

export default allConfigurations;
