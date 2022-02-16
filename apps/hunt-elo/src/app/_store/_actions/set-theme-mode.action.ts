import { StoreAction } from '../../_enums/store-action';
import { ThemeMode } from '../../_enums/theme-mode';
import { GlobalStore } from '../store';
import { settingsReducerPayload } from '../_reducers/update-theme.reducer';

/**
 * Sets the current theme mode
 *
 * @param themeMode the theme mode to set
 * @returns {void}
 */
export function setThemeMode(themeMode: ThemeMode): void {
    GlobalStore.dispatch<settingsReducerPayload<StoreAction.SET_THEME_MODE>>({
        type: StoreAction.SET_THEME_MODE,
        payload: themeMode,
    });
}
