import SettingsIcon from '@mui/icons-material/Settings';
import {
    createTheme,
    CssBaseline,
    IconButton,
    ThemeProvider,
} from '@mui/material';
import bezier from 'bezier-easing';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './app.module.scss';
import EloDisplay from './features/elo-display/elo-display';
import { SettingsOverlay } from './features/settings/settings-overlay';
import TitleBar from './title-bar/title-bar';
import { ActiveOverlay } from './_enums/current-overlay';
import { setActiveOverlay } from './_store/_actions/settings/set-active-overlay.action';
import { activeOverlaySelector } from './_store/_selectors/settings/active-overlay.selector';
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

    const activeOverlay = useSelector(activeOverlaySelector);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar />
            <AnimatePresence>
                {activeOverlay === ActiveOverlay.SETTINGS && (
                    <MotionConfig
                        transition={{
                            duration: 0.2,
                            // ease: bezier(0.66, 0.53, 0.67, 1.75),
                            easings: 'ease-out',
                        }}
                    >
                        <motion.div
                            style={{
                                scale: 1.25,
                                opacity: 0,
                                position: 'absolute',
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                position: 'absolute',
                            }}
                            exit={{
                                scale: 1.25,
                                opacity: 0,
                                position: 'absolute',
                            }}
                            className={classes['container-settings']}
                        >
                            <SettingsOverlay />
                        </motion.div>
                    </MotionConfig>
                )}
            </AnimatePresence>

            <div className={classes['content']}>
                <AnimatePresence>
                    {activeOverlay !== ActiveOverlay.SETTINGS && (
                        <MotionConfig
                            transition={{
                                duration: 0.22,
                                // ease: bezier(0.66, 0.53, 0.67, 1.75),
                                easings: 'ease-out',
                            }}
                        >
                            <motion.div
                                style={{
                                    scale: 1.25,
                                    opacity: 0,
                                    position: 'absolute',
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    position: 'absolute',
                                }}
                                exit={{
                                    scale: 1.25,
                                    opacity: 0,
                                    position: 'absolute',
                                }}
                                className={classes['container']}
                                data-tauri-drag-region
                            >
                                <div className={classes['header']}>
                                    <IconButton
                                        aria-label="settings"
                                        size="large"
                                        onClick={() =>
                                            setActiveOverlay(
                                                ActiveOverlay.SETTINGS
                                            )
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
                                            setActiveOverlay(
                                                ActiveOverlay.SETTINGS
                                            )
                                        }
                                    >
                                        <SettingsIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            </motion.div>
                        </MotionConfig>
                    )}
                </AnimatePresence>
            </div>
        </ThemeProvider>
    );
}

export default App;
