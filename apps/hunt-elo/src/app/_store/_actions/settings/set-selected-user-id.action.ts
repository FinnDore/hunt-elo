import { StoreAction } from '../../../_enums/store-action';
import { GlobalStore } from '../../store';
import { settingsReducerPayload } from '../../_reducers/settings.reducer';

/**
 * Selects a user by their id
 *
 * @param userId the id of the currently selected user
 * @returns {void}
 */
export function setSelectedUserId(userId: number | null) {
    GlobalStore.dispatch<settingsReducerPayload<StoreAction.SET_USER_ID>>({
        type: StoreAction.SET_USER_ID,
        payload: userId,
    });
}
