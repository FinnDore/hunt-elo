import { createSelector } from 'reselect';
import { RootState } from '../../store';

/**
 * Select's the currently selected username
 */
export const selectedUserNameSelector = createSelector(
    ({ settings, eloStore }: RootState) =>
        settings.selectedUserId
            ? eloStore[settings.selectedUserId]?.name ?? null
            : null,
    userName => userName
);
