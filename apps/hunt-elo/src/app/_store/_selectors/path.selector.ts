import { createSelector } from 'reselect';
import { RootState } from '../store';

/**
 * Selector the current theme mode
 */
export const pathSelector = createSelector(
    ({ settings: { path } }: RootState) => path,
    path => path
);
