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
import { ViewContainer } from './features/view-container/view-container';
import TitleBar from './title-bar/title-bar';
import { ActiveOverlay } from './_enums/current-overlay';
import { setActiveOverlay } from './_store/_actions/settings/set-active-overlay.action';
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
                    background: {
                        default: '#121212',
                    },
                    contrastThreshold: 3,
                    tonalOffset: 0.1,
                },
            }),
        [themeMode]
    );

    const settingsProps = useMemo(
        () => ({
            overlayName: ActiveOverlay.SETTINGS,
            className: classes['container-settings'],
            children: <SettingsOverlay />,
        }),
        []
    );
    const EloDisplayProps = useMemo(
        () => ({
            overlayName: ActiveOverlay.NONE,
            className: classes['container'],
            children: (
                <>
                    <div className={classes['header']}>
                        <IconButton
                            aria-label="settings"
                            size="large"
                            onClick={() =>
                                setActiveOverlay(ActiveOverlay.SETTINGS)
                            }
                        >
                            <SettingsIcon fontSize="inherit" />
                        </IconButton>
                    </div>

                    <div className={classes['elo-display']}>
                        <EloDisplay />
                    </div>

                    {/* used to center the elo display vertically */}
                    <div
                        className={`${classes['header']} ${classes['hidden']}`}
                    >
                        <IconButton
                            aria-label="settings"
                            size="large"
                            onClick={() =>
                                setActiveOverlay(ActiveOverlay.SETTINGS)
                            }
                        >
                            <SettingsIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                </>
            ),
        }),
        []
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar />
            <ViewContainer {...settingsProps}></ViewContainer>
            <ViewContainer {...EloDisplayProps}></ViewContainer>
        </ThemeProvider>
    );
}

export default App;
