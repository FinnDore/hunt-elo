import SettingsIcon from '@mui/icons-material/Settings';
import {
    createTheme,
    CssBaseline,
    IconButton,
    ThemeProvider,
} from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './app.module.scss';
import EloDisplay from './features/elo-display/elo-display';
import { SettingsOverlay } from './features/settings/settings-overlay';
import TitleBar from './title-bar/title-bar';
import { ActiveOverlay } from './_enums/current-overlay';
import { setActiveOverlay } from './_store/_actions/settings/set-active-overlay.action';
import { activeOverlaySelector } from './_store/_selectors/settings/active-overlay.selector';
import { themeModeSelector } from './_store/_selectors/settings/theme-mode.selector';

/**
 * The app component
 * @returns {object} the app component
 */
export function App() {
    const themeMode = useSelector(themeModeSelector);
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    primary: {
                        main: '#face88',
                    },
                    contrastThreshold: 3,
                    tonalOffset: 0.1,
                },
            }),
        [themeMode]
    );

    const activeOverlay = useSelector(activeOverlaySelector);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar></TitleBar>
            {activeOverlay === ActiveOverlay.SETTINGS && (
                <div className={classes['overlay']}>
                    <SettingsOverlay></SettingsOverlay>
                </div>
            )}
            <div className={classes['container']} data-tauri-drag-region>
                <div className={classes['header']}>
                    <IconButton
                        aria-label="settings"
                        size="large"
                        onClick={() => setActiveOverlay(ActiveOverlay.SETTINGS)}
                    >
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <EloDisplay />
            </div>
        </ThemeProvider>
    );
}

export default App;
