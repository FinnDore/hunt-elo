import SettingsIcon from '@mui/icons-material/Settings';
import {
    createTheme,
    CssBaseline,
    IconButton,
    TextField,
    ThemeProvider,
    Tooltip,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './app.module.scss';
import TitleBar from './title-bar/title-bar';
import { getEloAndId } from './_functions/get-elo-and-id';
import { getPath } from './_functions/get-path';
import { Text } from '@visx/text';
import { ParentSize } from '@visx/responsive';
import { GradientOrangeRed } from '@visx/gradient';
import { environment } from '../environments/environment';
import { useSelector } from 'react-redux';
import { pathSelector } from './_store/_selectors/path.selector';
import { themeModeSelector } from './_store/_selectors/theme-mode.selector';
import { setPath } from './_store/_actions/set-path.action';
import { appendEloById } from './_store/_actions/append-elo.action';
import { eloSelector } from './_store/_selectors/elo.selector';
import { setUserNameById } from './_store/_actions/set-user-name.action';
import { eloHistorySelector } from './_store/_selectors/elo-history.selector';
import { Settings } from './features/settings/settings';

const DEFAULT_PATH = environment.production
    ? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml'
    : '../../hunt-elo/src/assets/attributes.xml';

/**
 * Returns the elo for a given user
 * @param username the username to use
 * @param path the path to use
 * @param currentElo the currentElo
 * @returns {boolean} indicating if there was an error appending the elo
 */
async function updateElo(
    username: string,
    path: string,
    currentElo: number | null
): Promise<boolean> {
    const eloAnId = await getEloAndId(username, path ?? DEFAULT_PATH);
    if (!eloAnId || eloAnId?.elo === currentElo) {
        return false;
    }

    appendEloById(eloAnId.elo, eloAnId.userId);
    return true;
}

/**
 * The app component
 * @returns {object} the app component
 */
export function App() {
    const [username, setUsername] = useState<string>('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const path = useSelector(pathSelector);
    const themeMode = useSelector(themeModeSelector);

    const elo = useSelector(eloSelector(currentUserId));

    const refreshElo = useMemo(
        () => (): Promise<boolean> => updateElo(username, path, elo),
        [username, path, elo]
    );

    useEffect(() => {
        (async () => {
            const eloAndId = await getEloAndId(username, path);
            setCurrentUserId(eloAndId?.userId ?? null);
            if (typeof eloAndId?.userId === 'number') {
                setUserNameById(username, eloAndId.userId);
            }
        })();
    }, [username, path]);

    useEffect(() => {
        refreshElo();
    }, [refreshElo]);

    const setCurrentPath = useMemo(
        () => async () => {
            const path = (await getPath())?.[0];
            if (path) {
                setPath(path);
            }
        },
        []
    );

    useEffect(() => {
        window.addEventListener('focus', refreshElo);
        const timer = setInterval(refreshElo, 3000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('focus', refreshElo);
        };
    }, [refreshElo]);

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar></TitleBar>
            <div className={classes['container']} data-tauri-drag-region>
                <div className={classes['header']}>
                    <IconButton
                        aria-label="settings"
                        size="large"
                        onClick={setCurrentPath}
                    >
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div
                    className={classes['overlay']}
                    style={{ background: palette.background.default }}
                >
                    <Settings></Settings>
                </div>
                {elo !== null ? (
                    <div className={classes['elo']}>
                        <ParentSize>
                            {({ width }) => (
                                <svg
                                    width={width}
                                    className={classes['text-svg']}
                                >
                                    <GradientOrangeRed id="elo-gradient" />
                                    <Text
                                        verticalAnchor="start"
                                        scaleToFit={true}
                                        width={width * 0.95}
                                        fill="url(#elo-gradient)"
                                    >
                                        {elo}
                                    </Text>
                                </svg>
                            )}
                        </ParentSize>
                    </div>
                ) : (
                    <div>no user found</div>
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
