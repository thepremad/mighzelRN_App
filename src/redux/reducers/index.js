import {combineReducers} from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import homeReducer from './homeReducer';
import routeReducer from './routeReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  route: routeReducer,
  cart: cartReducer,
});

export default rootReducer;
