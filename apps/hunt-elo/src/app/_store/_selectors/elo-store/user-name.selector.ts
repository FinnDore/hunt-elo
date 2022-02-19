import { createSelector } from 'reselect';
import { RootState } from '../../store';

/**
 * Select the elo history for a given user
 * @param userId the of the user to retrieve elo history for
 * @returns {number[] | null} the elo history for the given user
 */
export function eloHistorySelector(userId: number | null) {
    if (userId === null) {
        return () => null;
    }

    return createSelector(
        ({ eloStore }: RootState) => eloStore[userId]?.eloHistory ?? null,
        eloHistory => eloHistory
    );
}
