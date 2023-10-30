import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';

const Footer = ({navigation, state}) => {
  const [index, setIndex] = useState(0);

  const {cartData} = useSelector(state => state.cart);

  useEffect(() => {
    setIndex(state.index);
  }, [state.index]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{padding: 6}}
        activeOpacity={1}
        onPress={() => navigation.navigate('Home', {screen: 'HomeScreen'})}>
        <SimpleLineIcons
          name="home"
          size={wp(5)}
          color={index === 0 ? '#fff' : '#000'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{padding: 6}}
        activeOpacity={1}
        onPress={() => navigation.navigate('Category')}>
        <Ionicons
          name="grid-outline"
          size={wp(5.5)}
          color={index === 1 ? '#fff' : '#000'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{padding: 6}}
        activeOpacity={1}
        onPress={() => navigation.navigate('Cart')}>
        <SimpleLineIcons
          name="handbag"
          size={wp(5)}
          color={index === 2 ? '#fff' : '#000'}
        />
        <Badge style={{top: -4, position: 'absolute', right: -8}}>
          {cartData?.length}
        </Badge>
      </TouchableOpacity>

      <TouchableOpacity
        style={{padding: 6}}
        activeOpacity={1}
        onPress={() => navigation.navigate('Profile')}>
        <Feather
          name="user"
          size={wp(6)}
          color={index === 3 ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    backgroundColor: '#d68088',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
