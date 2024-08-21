import authReducer from './auth.reducer';
import userReducer from './user.reducer';

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'accessToken']
}

const rootReducer = combineReducers({
    authReducer: persistReducer(authConfig, authReducer),
    userReducer: userReducer
})

export default rootReducer;