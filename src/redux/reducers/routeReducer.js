import {SET_MAIN_ROUTE} from '../action/ActionTypes';

const initialUserState = {
  mainRoute: 'Splash',
};

const routeReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_MAIN_ROUTE:
      //  console.log(SET_MAIN_ROUTE);
      return {
        ...state,
        mainRoute: action.payload,
      };
    default:
      return state;
  }
};

export default routeReducer;
