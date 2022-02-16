import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { settingsReducerPayload } from '../_reducers/update-theme.reducer';

/**
 * Sets the current path
 *
 * @param path the path mode to set
 * @returns {void}
 */
export function setPath(path: string): void {
    GlobalStore.dispatch<settingsReducerPayload<StoreAction.SET_PATH>>({
        type: StoreAction.SET_PATH,
        payload: path,
    });
}
