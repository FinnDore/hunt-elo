import { createSelector } from 'reselect';
import { eloHistorySelector } from './elo-history.selector';

/**
 * Selects the latest elo value for a given user
 * @param userId the of the user to retrieve elo for
 * @returns {number | null} the elo for the given user
 */
export function eloSelector(userId: number | null) {
    if (userId === null) {
        return () => null;
    }

    return createSelector(eloHistorySelector(userId), eloHistory =>
        eloHistory ? eloHistory[eloHistory.length - 1] : null
    );
}
