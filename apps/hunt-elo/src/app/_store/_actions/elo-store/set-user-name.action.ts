import { StoreAction } from '../../../_enums/store-action';
import { GlobalStore } from '../../store';
import { eloStoreReducerPayload } from '../../_reducers/elo-store.reducer';

/**
 * Sets the users username by id
 *
 * @param userName the username to set
 * @param userId the user id to use
 * @returns {void}
 */
export function setUserNameById(userName: string, userId: number): void {
    GlobalStore.dispatch<eloStoreReducerPayload<StoreAction.SET_USER_NAME>>({
        type: StoreAction.SET_USER_NAME,
        payload: { userId, userName },
    });
}
