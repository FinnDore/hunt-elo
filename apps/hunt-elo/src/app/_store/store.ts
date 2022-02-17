import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { settingsReducer } from './_reducers/settings.reducer';

const rootReducer = combineReducers({
    settings: settingsReducer,
});

export const GlobalStore = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = typeof GlobalStore.dispatch;
