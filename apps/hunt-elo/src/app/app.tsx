import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './app.module.scss';
import Elo from './features/elo/elo';
import { SettingsOverlay } from './features/settings/settings-overlay';
import { ViewContainer } from './features/view-container/view-container';
import TitleBar from './title-bar/title-bar';
import { ActiveOverlay } from './_enums/current-overlay';
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
            children: <Elo />,
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
