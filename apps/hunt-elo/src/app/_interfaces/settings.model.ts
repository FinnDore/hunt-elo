import { PaletteMode } from '@mui/material';

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
}
