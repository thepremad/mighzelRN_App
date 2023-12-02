/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

// Screen
import ProcessingScreen from '../components/ProcessingScreen';
import CancelledScreen from '../components/CancelledScreen';
import DeliveredScreen from '../components/DeliveredScreen';
import Header from '../components/Header';

class OrderTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: {
        index: 0,
        routes: [
          {
            key: 'Delivered',
            title: 'Delivered',
          },
          {
            key: 'Processing',
            title: 'Processing',
          },
          {
            key: 'Cancelled',
            title: 'Cancelled',
          },
        ],
      },
    };

    // configuring TabView
    const {width} = Dimensions.get('window');
    this.initialLayout = {width};

    // SceneMap Routing
    const {navigation} = this.props;

    const DeliveredRoute = () => <DeliveredScreen navigation={navigation} />;

    const ProcessingRoute = () => (
      <ProcessingScreen
        navigation={navigation}
        //  handleTabChange={this.handleTabIndexChange}
      />
    );

    const CancelledRoute = () => (
      <CancelledScreen
        navigation={navigation}
        //  handleTabChange={this.handleTabIndexChange}
      />
    );

    this.sceneMap = SceneMap({
      Delivered: DeliveredRoute,
      Processing: ProcessingRoute,
      Cancelled: CancelledRoute,
    });
  }

  handleTabIndexChange = index => {
    const tabView = {...this.state.tabView, index};
    this.setState({tabView});
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBarStyle}
      scrollEnabled={true}
      renderIcon={this.renderIcon}
      renderLabel={({route, focused, color}) => (
        <Text
          style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}>
          {route.title}
        </Text>
      )}
      tabStyle={styles.internalTabStyle}
    />
  );

  render() {
    // console.log('this.props.orderData', this.props.orderData);
    const {state, sceneMap, handleTabIndexChange, initialLayout} = this;
    const {tabView} = state;

    return (
      <View style={styles.container}>
        <Header
          title="My Order"
          titleStyle={{fontSize: wp(4.2)}}
          navAction="back"
        />

        <View style={styles.formContainer}>
          <TabView
            initialLayout={initialLayout}
            navigationState={tabView}
            renderScene={sceneMap}
            onIndexChange={handleTabIndexChange}
            renderTabBar={this.renderTabBar}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // orderData: state.order.orderData,
});

const mapDispatchToProps = {
  // fetchOrderDataRequest,
};

export default OrderTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBarIndicator: {
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(3),
    color: '#000',
  },
  tabIcon: {
    height: hp(4),
    // height: hp(7.1),
    //backgroundColor:'black'
    aspectRatio: 1 / 1,
  },
  activeTabTextColor: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Roboto-Medium',
  },
  tabTextColor: {
    fontSize: wp(4),
    color: '#999',
    fontFamily: 'Roboto-Medium',
  },
  internalTabStyle: {
    width: wp(33.29),
  },
});
