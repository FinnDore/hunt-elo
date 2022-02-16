import { createSelector } from 'reselect';
import { RootState } from '../store';

/**
 * Selector the current theme mode
 */
export const themeModeSelector = createSelector(
    ({ settings: { themeMode } }: RootState) => themeMode,
    themeMode => themeMode
);
