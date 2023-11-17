import {applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [sagaMiddleware],
// });

// sagaMiddleware.run(rootSaga);

// export default store;

//#####################################################################

import {persistStore, persistReducer} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['home', 'cart', 'user', 'order'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};

//####################################################################################

// import SQLite from '@react-native-community/sqlite-storage';

// Create a SQLite database instance
// const database = SQLite.openDatabase({ name: 'mydatabase.db' });

// Define your custom storage engine
// const customStorage = {
//   getItem: (key) => {
//     return new Promise((resolve, reject) => {
//       database.transaction((tx) => {
//         tx.executeSql(
//           'SELECT value FROM YourTable WHERE key = ?',
//           [key],
//           (_, { rows }) => {
//             const result = rows.item(0);
//             resolve(result ? JSON.parse(result.value) : null);
//           },
//           (_, error) => {
//             reject(error);
//           }
//         );
//       });
//     });
//   },
//   setItem: (key, value) => {
//     return new Promise((resolve, reject) => {
//       database.transaction((tx) => {
//         tx.executeSql(
//           'INSERT OR REPLACE INTO YourTable (key, value) VALUES (?, ?)',
//           [key, JSON.stringify(value)],
//           (_, { rowsAffected }) => {
//             if (rowsAffected > 0) {
//               resolve();
//             } else {
//               reject(new Error('Failed to set item in the database'));
//             }
//           },
//           (_, error) => {
//             reject(error);
//           }
//         );
//       });
//     });
//   },
//   removeItem: (key) => {
//     return new Promise((resolve, reject) => {
//       database.transaction((tx) => {
//         tx.executeSql(
//           'DELETE FROM YourTable WHERE key = ?',
//           [key],
//           (_, { rowsAffected }) => {
//             if (rowsAffected > 0) {
//               resolve();
//             } else {
//               reject(new Error('Failed to remove item from the database'));
//             }
//           },
//           (_, error) => {
//             reject(error);
//           }
//         );
//       });
//     });
//   },
// };

// Configuration for Redux Persist with the custom storage engine
// const persistConfig = {
//   key: 'root',
//   storage: customStorage,
//   whitelist: ['categories'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [sagaMiddleware],
// });

// const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

// export { store, persistor };
