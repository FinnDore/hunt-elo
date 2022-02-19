import { PayloadAction } from '@reduxjs/toolkit';
import { environment } from '../../../environments/environment';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { StoreAction } from '../../_enums/store-action';
import { ThemeMode } from '../../_enums/theme-mode';
import { Settings } from '../../_interfaces/settings.model';
/**
 * Payload for setting the current theme mode
 */
export type setThemeModeReducerPayload = PayloadAction<
    ThemeMode,
    StoreAction.SET_THEME_MODE
>;

/**
 * Payload for setting the current path
 */
export type setPathReducerPayload = PayloadAction<string, StoreAction.SET_PATH>;

/**
 * Payload for setting the active overlay
 */
export type setActiveOverlayReducerPayload = PayloadAction<
    ActiveOverlay,
    StoreAction.SET_ACTIVE_OVERLAY
>;

/**
 * Payload for setting active users id
 */
export type setSelectedUserIdReducerPayload = PayloadAction<
    number | null,
    StoreAction.SET_USER_ID
>;

type settingsReducerTypes =
    | setThemeModeReducerPayload
    | setPathReducerPayload
    | setActiveOverlayReducerPayload
    | setSelectedUserIdReducerPayload;

export type settingsReducerPayload<T = unknown> =
    T extends StoreAction.SET_THEME_MODE
        ? setThemeModeReducerPayload
        : T extends StoreAction.SET_PATH
        ? setPathReducerPayload
        : T extends StoreAction.SET_ACTIVE_OVERLAY
        ? setActiveOverlayReducerPayload
        : T extends StoreAction.SET_USER_ID
        ? setSelectedUserIdReducerPayload
        : PayloadAction<unknown, StoreAction>;

const DEFAULT_STATE: Settings = {
    themeMode: ThemeMode.DARK,
    path: environment.production
        ? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml'
        : '../../hunt-elo/src/assets/attributes.xml',
    selectedUserId: null,
    activeOverlay: ActiveOverlay.NONE,
};

/**
 * Sets the current theme mode
 *
 * @param state the current store state
 * @param action the action to execute
 * @returns {object} the updated state
 */
export function settingsReducer(
    state = DEFAULT_STATE,
    action: settingsReducerTypes
): Settings {
    if (action.type === StoreAction.SET_THEME_MODE) {
        return { ...state, themeMode: action.payload };
    } else if (action.type === StoreAction.SET_PATH) {
        return { ...state, path: action.payload };
    } else if (action.type === StoreAction.SET_ACTIVE_OVERLAY) {
        return { ...state, activeOverlay: action.payload };
    } else if (action.type === StoreAction.SET_USER_ID) {
        return { ...state, selectedUserId: action.payload };
    }
    return state;
}
