import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import cart from './cartSlice';
import dialog from './DialogSlice';
import expandSidebar from './ExpandSlice';
const reducers = combineReducers({ cart, expandSidebar, dialog });

const config = {
	key: 'root',
	storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
	reducer: reducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export default store;
