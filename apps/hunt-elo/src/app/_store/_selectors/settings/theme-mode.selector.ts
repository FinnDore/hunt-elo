import { createSelector } from 'reselect';
import { RootState } from '../../store';

/**
 * Select the current theme mode
 */
export const themeModeSelector = createSelector(
    ({ settings: { themeMode } }: RootState) => themeMode,
    themeMode => themeMode
);
