import SettingsIcon from '@mui/icons-material/Settings';
import {
    createTheme,
    CssBaseline,
    IconButton,
    TextField,
    ThemeProvider,
    Tooltip,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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

const DEFAULT_PATH = environment.production
    ? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml'
    : '../../hunt-elo/src/assets/attributes.xml';

/**
 * Returns the elo for a given user
 * @param username the username to use
 * @param path the path to use
 * @returns {number | null} the elo for the user
 */
async function getElo(username: string, path: string): Promise<number | null> {
    const eloAnId = await getEloAndId(username, path ?? DEFAULT_PATH);
    if (!eloAnId) {
        return null;
    }
    return eloAnId.elo;
}

/**
 * The app component
 * @returns {object} the app component
 */
export function App() {
    const [username, setUsername] = useState<string>('');
    const [elo, setElo] = useState<number | null>(null);

    const path = useSelector(pathSelector);
    const themeMode = useSelector(themeModeSelector);

    // const elo2 = useMemo(() => useSelector(eloSelector(userId)), [userId] )
    // const elo2 = useMemo(() => useSelector(eloSelector(userId)), [userId] )

    useMemo(async () => setElo(await getElo(username, path)), [username, path]);

    const updateElo = useMemo(
        () => async () => setElo(await getElo(username, path ?? DEFAULT_PATH)),
        [username, path]
    );

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
        window.addEventListener('focus', updateElo);
        const timer = setInterval(updateElo, 3000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('focus', updateElo);
        };
    }, [updateElo]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar></TitleBar>
            <div className={classes['container']} data-tauri-drag-region>
                <div className={classes['header']}>
                    <TextField
                        className={classes['input']}
                        id="outlined-basic"
                        label="username"
                        onChange={e => {
                            setUsername(e.target.value ?? '');
                        }}
                        variant="outlined"
                        helperText="case sensitive"
                    />
                    <IconButton
                        aria-label="settings"
                        size="large"
                        onClick={setCurrentPath}
                    >
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
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
