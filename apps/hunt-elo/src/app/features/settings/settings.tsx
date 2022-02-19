import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { environment } from '../../../environments/environment.prod';
import { getEloAndId } from '../../_functions/get-elo-and-id';
import { getPath } from '../../_functions/get-path';
import { logElo } from '../../_functions/log-elo';
import { appendEloById } from '../../_store/_actions/elo-store/append-elo.action';
import { setPath } from '../../_store/_actions/settings/set-path.action';
import { setUserNameById } from '../../_store/_actions/elo-store/set-user-name.action';
import { eloHistorySelector } from '../../_store/_selectors/elo-store/elo-history.selector';
import { eloSelector } from '../../_store/_selectors/elo-store/elo.selector';
import { pathSelector } from '../../_store/_selectors/settings/path.selector';
import classes from './settings.module.scss';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SettingsIcon from '@mui/icons-material/settings';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { setActiveOverlay } from '../../_store/_actions/settings/set-active-overlay.action';

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
 * The settings component
 * @returns {object} the settings component
 */
export function Settings() {
    const [username, setUsername] = useState<string>('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const path = useSelector(pathSelector);

    const elo = useSelector(eloSelector(currentUserId));
    const eloHistory = useSelector(eloHistorySelector(currentUserId));

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
        logElo(eloHistory ?? []);
    }, [eloHistory]);

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

    return (
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

            <IconButton
                aria-label="settings"
                size="large"
                onClick={() => setActiveOverlay(ActiveOverlay.NONE)}
            >
                <ClearOutlinedIcon fontSize="inherit" />
            </IconButton>
        </div>
    );
}

export default Settings;
