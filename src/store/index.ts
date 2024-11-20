// import { configureStore } from '@reduxjs/toolkit';
// import accountReducer from './account/reducers';
// import storage from 'redux-persist/lib/storage';
// import {persistReducer} from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['account']
// };

// const store = configureStore({
//   reducer: {
//     account: accountReducer,
//   },
// });

// const persistedReducer = persistReducer(persistConfig, store)

// export type AppState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import accountReducer from './account/reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setAuthToken } from '../helpers';
import  userReducer  from './users/reducers';
import ruleReducer from './role/reducers';
import  alertReducer  from './alert/reducers';
// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account'], // Danh sách các reducer cần lưu trữ
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  account: accountReducer,
  users: userReducer,
  alert: alertReducer,
  role: ruleReducer,
});

// Áp dụng persistReducer lên rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store với persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Khởi tạo persistor
const persistor = persistStore(store);

let currentState = store.getState() as AppState

store.subscribe(() => {
  let previousState = currentState
  currentState = store.getState() as AppState

  if (previousState.account.token !== currentState.account.token) { 
    const token = currentState.account.token
    if(token) {
      setAuthToken(token)
    }
  }
})


export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
