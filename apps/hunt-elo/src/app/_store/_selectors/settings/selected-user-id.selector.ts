import { createSelector } from 'reselect';
import { RootState } from '../../store';

/**
 * Select's the id of the currently selected user
 */
export const selectedUserIdSelector = createSelector(
    ({ settings: { selectedUserId } }: RootState) => selectedUserId,
    selectedUserId => selectedUserId
);
