import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Header = ({
  title,
  navAction,
  titleStyle,
  style,
  search,
  handleSearch,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.header, style]}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {navAction === 'back' && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={{borderRadius: hp(10)}}>
            <AntDesign name="arrowleft" color="#d68088" size={wp(5)} />
          </TouchableOpacity>
        )}

        <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
      </View>
      {search && (
        <TouchableOpacity onPress={handleSearch}>
          <Fontisto name="search" color="#d68088" size={wp(5)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    paddingTop: hp(2),
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#000',
    fontSize: wp(4),
    marginLeft: wp(6),
  },
});
