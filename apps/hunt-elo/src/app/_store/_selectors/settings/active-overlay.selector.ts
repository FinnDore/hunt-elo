import { createSelector } from 'reselect';
import { RootState } from '../../store';

/**
 * Select the active overlay
 */
export const activeOverlaySelector = createSelector(
    ({ settings: { activeOverlay } }: RootState) => activeOverlay,
    activeOverlay => activeOverlay
);
