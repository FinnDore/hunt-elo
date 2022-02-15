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
import { getElo } from './_functions/get-elo';
import { getPath } from './_functions/get-path';
import { Text } from '@visx/text';
import { ParentSize } from '@visx/responsive';
import { GradientOrangeRed } from '@visx/gradient';
const DEFAULT_PATH =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#face88',
        },
        secondary: {
            main: '#00f2c4',
        },
        contrastThreshold: 3,
        tonalOffset: 0.1,
    },
});

/**
 * The app component
 * @returns {object} the app component
 */
export function App() {
    const [username, setUsername] = useState<string>('');
    const [elo, setElo] = useState<number | null>(null);
    const [path, setPath] = useState<string>(DEFAULT_PATH);

    useMemo(
        async () => setElo(await getElo(username, path ?? DEFAULT_PATH)),
        [username, path]
    );

    const updateElo = useMemo(
        () => async () => setElo(await getElo(username, path ?? DEFAULT_PATH)),
        [username, path]
    );

    useEffect(() => {
        window.addEventListener('focus', updateElo);
        const timer = setInterval(updateElo, 5000);

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
                        onChange={(e) => {
                            setUsername(e.target.value ?? '');
                        }}
                        variant="outlined"
                        helperText="case sensitive"
                    />
                    <IconButton
                        aria-label="settings"
                        size="large"
                        onClick={async () =>
                            setPath((await getPath())?.[0] ?? DEFAULT_PATH)
                        }
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
