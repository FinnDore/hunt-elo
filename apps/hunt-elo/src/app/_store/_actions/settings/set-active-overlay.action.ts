import { ActiveOverlay } from '../../../_enums/current-overlay';
import { StoreAction } from '../../../_enums/store-action';
import { GlobalStore } from '../../store';
import { settingsReducerPayload } from '../../_reducers/settings.reducer';

/**
 * Opens the given overlay
 *
 * @param activeOverlay the overlay to activate
 * @returns {void}
 */
export function setActiveOverlay(activeOverlay: ActiveOverlay) {
    GlobalStore.dispatch<
        settingsReducerPayload<StoreAction.SET_ACTIVE_OVERLAY>
    >({
        type: StoreAction.SET_ACTIVE_OVERLAY,
        payload: activeOverlay,
    });
}
