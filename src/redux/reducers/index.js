import {combineReducers} from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import homeReducer from './homeReducer';
import orderReducer from './orderReducer';
import productReducer from './productReducer';
import routeReducer from './routeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  route: routeReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  product: productReducer,
});

export default rootReducer;
