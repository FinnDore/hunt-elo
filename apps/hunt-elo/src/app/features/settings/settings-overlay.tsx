import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SettingsIcon from '@mui/icons-material/settings';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { environment } from '../../../environments/environment.prod';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { getEloAndId } from '../../_functions/get-elo-and-id';
import { getPath } from '../../_functions/get-path';
import { logElo } from '../../_functions/log-elo';
import { appendEloById } from '../../_store/_actions/elo-store/append-elo.action';
import { setUserNameById } from '../../_store/_actions/elo-store/set-user-name.action';
import { setActiveOverlay } from '../../_store/_actions/settings/set-active-overlay.action';
import { setPath } from '../../_store/_actions/settings/set-path.action';
import { setSelectedUserId } from '../../_store/_actions/settings/set-selected-user-id.action';
import { eloHistorySelector } from '../../_store/_selectors/elo-store/elo-history.selector';
import { eloSelector } from '../../_store/_selectors/elo-store/elo.selector';
import { pathSelector } from '../../_store/_selectors/settings/path.selector';
import { selectedUserIdSelector } from '../../_store/_selectors/settings/selected-user-id.selector copy';
import classes from './settings-overlay.module.scss';

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
export function SettingsOverlay() {
    const [inputtedUsername, setInputtedUsername] = useState<string>('');

    const path = useSelector(pathSelector);

    const userId = useSelector(selectedUserIdSelector);
    const elo = useSelector(eloSelector(userId));
    const eloHistory = useSelector(eloHistorySelector(userId));
    console.log(userId);
    console.log(elo);
    const refreshElo = useMemo(
        () => (): Promise<boolean> => updateElo(inputtedUsername, path, elo),
        [inputtedUsername, path, elo]
    );

    useEffect(() => {
        (async () => {
            const eloAndId = await getEloAndId(inputtedUsername, path);
            if (typeof eloAndId?.userId === 'number') {
                setUserNameById(inputtedUsername, eloAndId.userId);
                setSelectedUserId(eloAndId.userId);
            }
        })();
    }, [inputtedUsername, path]);

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
                    setInputtedUsername(e.target.value ?? '');
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

export default SettingsOverlay;
