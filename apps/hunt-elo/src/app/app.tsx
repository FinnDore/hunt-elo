import {
    Button,
    createTheme,
    CssBaseline,
    TextField,
    ThemeProvider,
} from '@mui/material';
import { dialog } from '@tauri-apps/api';
import { useMemo, useState } from 'react';
import { getElo } from './_functions/get-elo';

const DEFAULT_PATH =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml';

// eslint-disable-next-line require-jsdoc
async function getPath() {
    const path = await dialog.open({
        directory: false,
    });

    return typeof path === 'string' ? path : path[0];
}
/**
 * The app component
 * @returns {object} the app component
 */
export function App() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#000000',
            },
            contrastThreshold: 3,
            tonalOffset: 0.6,
        },
    });

    const [username, setUsername] = useState<string>('');
    const [elo, setElo] = useState<number | null>(null);
    const [path, setPath] = useState<string>(DEFAULT_PATH);

    useMemo(
        async () => setElo(await getElo(username, path ?? DEFAULT_PATH)),
        [username, path]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="container" data-tauri-drag-region="">
                <Button
                    variant="contained"
                    onClick={async () => setPath(await getPath())}
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
