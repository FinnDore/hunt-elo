import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { eloStoreReducerPayload } from '../_reducers/elo-store.reducer';

/**
 * Appends an elo value to a users elo history
 *
 * @param elo the elo to append
 * @param userId the user id to use
 * @returns {void}
 */
export function appendEloById(elo: number, userId: number): void {
    GlobalStore.dispatch<eloStoreReducerPayload<StoreAction.APPEND_ELO>>({
        type: StoreAction.APPEND_ELO,
        payload: { userId, elo },
    });
}
