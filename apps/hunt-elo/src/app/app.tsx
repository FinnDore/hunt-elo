import {
    Button,
    createTheme,
    CssBaseline,
    TextField,
    ThemeProvider,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getElo } from './_functions/get-elo';
import { getPath } from './_functions/get-path';

const DEFAULT_PATH =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffff',
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
            <div className="container" data-tauri-drag-region="">
                <Button
                    variant="contained"
                    onClick={async () =>
                        setPath((await getPath())[0] ?? DEFAULT_PATH)
                    }
                >
                    Set custom Path
                </Button>
                <div>Enter your username ( case sensitive )</div>
                <TextField
                    id="outlined-basic"
                    label="username"
                    onChange={(e) => setUsername(e.target.value ?? '')}
                    variant="outlined"
                />
                {elo !== null ? (
                    <div className="elo">
                        elo:
                        <b>{elo}</b>{' '}
                    </div>
                ) : (
                    <div>no user found</div>
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
