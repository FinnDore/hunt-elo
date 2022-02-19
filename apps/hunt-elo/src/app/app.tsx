import SettingsIcon from '@mui/icons-material/Settings';
import {
    createTheme,
    CssBaseline,
    IconButton,
    ThemeProvider,
} from '@mui/material';
import { GradientOrangeRed } from '@visx/gradient';
import { ParentSize } from '@visx/responsive';
import { Text } from '@visx/text';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { environment } from '../environments/environment';
import classes from './app.module.scss';
import EloDisplay from './features/elo-disaplay/elo-display';
import { Settings } from './features/settings/settings';
import TitleBar from './title-bar/title-bar';
import { getEloAndId } from './_functions/get-elo-and-id';
import { getPath } from './_functions/get-path';
import { logElo } from './_functions/log-elo';
import { appendEloById } from './_store/_actions/append-elo.action';
import { setPath } from './_store/_actions/set-path.action';
import { setUserNameById } from './_store/_actions/set-user-name.action';
import { eloHistorySelector } from './_store/_selectors/elo-history.selector';
import { eloSelector } from './_store/_selectors/elo.selector';
import { pathSelector } from './_store/_selectors/path.selector';
import { themeModeSelector } from './_store/_selectors/theme-mode.selector';

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

    const [showSettings, setShowSettings] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar></TitleBar>
            {showSettings && (
                <div className={classes['overlay']}>
                    <Settings></Settings>
                </div>
            )}
            <div className={classes['container']} data-tauri-drag-region>
                <EloDisplay />
            </div>
        </ThemeProvider>
    );
}

export default App;
