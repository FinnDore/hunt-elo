import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eloStoreReducer } from './_reducers/elo-store.reducer';

import { settingsReducer } from './_reducers/settings.reducer';

const rootReducer = combineReducers({
    settings: settingsReducer,
    eloStore: eloStoreReducer,
});

export const GlobalStore = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = typeof GlobalStore.dispatch;
