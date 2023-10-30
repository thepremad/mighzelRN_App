import {SET_MAIN_ROUTE} from './ActionTypes';

export const setMainRoute = index => ({
  type: SET_MAIN_ROUTE,
  payload: index,
});
