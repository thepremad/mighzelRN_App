/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon, Snackbar} from 'react-native-paper';

const CustomSnack = ({visible, setVisible, snackText, error}) => {
  const onDismissSnackBar = () => setVisible(false);
  return (
    <Snackbar
      style={{
        backgroundColor: error ? 'rgb(150,0,0)' : 'rgb(0,150,0)',
        zIndex: 999,
        position: 'absolute',
      }}
      elevation={5}
      visible={visible}
      onIconPress={onDismissSnackBar}
      duration={3000}
      onDismiss={onDismissSnackBar}>
      <Text style={{color: '#fff'}}>{snackText}</Text>
    </Snackbar>
  );
};

export default CustomSnack;
