import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { dialog } from '@tauri-apps/api';
import { readTextFile } from '@tauri-apps/api/fs';
import { useState } from 'react';

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
            tonalOffset: 0.2,
        },
    });

    const [mmr, setMmr] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <button onClick={async () => setMmr(await getMmr())}>
                Read file
            </button>
            Your mmr is <b>{mmr}</b>
        </ThemeProvider>
    );
}

export default App;

// eslint-disable-next-line require-jsdoc
async function getMmr(): Promise<string> {
    const path = await dialog.open({
        directory: false,
    });
    let file = '';
    if (typeof path === 'string') {
        file = await readTextFile(path);
    } else {
        file = await readTextFile(path[0]);
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file, 'text/xml');
    console.log(xmlDoc);

    const attrs = xmlDoc.children[0].children;
    for (let i = 0; i < attrs.length - 1; i++) {
        const attrName = attrs.item(i)?.attributes.getNamedItem('name');
        const name = attrs.item(i)?.attributes.getNamedItem('value');
        if (
            attrName?.value.startsWith('MissionBagPlayer') &&
            name?.value === 'Finn'
        ) {
            const prefix = attrName.value.replace('blood_line_name', '');
            for (let i = 0; i < attrs.length; i++) {
                const attrName = attrs.item(i)?.attributes.getNamedItem('name');
                if (attrName?.value === prefix + 'mmr') {
                    const mmr = attrs.item(i)?.attributes.getNamedItem('value');
                    console.log('your mmr is' + mmr?.value);
                    return mmr?.value ?? '';
                }
            }
        }
    }
    return '';
}
