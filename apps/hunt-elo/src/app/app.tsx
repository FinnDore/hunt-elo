import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode } from '../_enums/theme-mode';

const themeMode = ThemeMode.dark;
/**
 * The app component
 * @returns {object} the app component
 */
export function App() {
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === ThemeMode.dark ? '#ffffff' : '#000000',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      hello World
    </ThemeProvider>
  );
}

export default App;
