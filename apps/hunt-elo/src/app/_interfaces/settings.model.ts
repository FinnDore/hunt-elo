import { PaletteMode } from '@mui/material';
import { ActiveOverlay } from '../_enums/current-overlay';

/**
 * The settings for the tree map chart
 */
export interface Settings {
    /**
     *  {@property} The current theme mode
     */
    themeMode: PaletteMode;
    /**
     *  {@property} The path to the users attribute xml file
     */
    path: string;
    /**
     *  {@property} The selected user's Id
     */
    selectedUserId: number | null;
    /**
     * {@property}  The overlay thats currently showing
     */
    activeOverlay: ActiveOverlay;
}
