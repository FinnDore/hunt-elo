import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SettingsIcon from '@mui/icons-material/settings';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { environment } from '../../../environments/environment.prod';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { getAttrsByUserId } from '../../_functions/get-attrs-by-id';
import { getAttrsByUserName } from '../../_functions/get-attrs-by-name';
import { getPath } from '../../_functions/get-path';
import { logElo } from '../../_functions/log-elo';
import { appendEloById } from '../../_store/_actions/elo-store/append-elo.action';
import { setUserNameById } from '../../_store/_actions/elo-store/set-user-name.action';
import { setActiveOverlay } from '../../_store/_actions/settings/set-active-overlay.action';
import { setPath } from '../../_store/_actions/settings/set-path.action';
import { setSelectedUserId } from '../../_store/_actions/settings/set-selected-user-id.action';
import { eloHistorySelector } from '../../_store/_selectors/elo-store/elo-history.selector';
import { pathSelector } from '../../_store/_selectors/settings/path.selector';
import { selectedUserIdSelector } from '../../_store/_selectors/settings/selected-user-id.selector';
import classes from './settings-overlay.module.scss';

const DEFAULT_PATH = environment.production
    ? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Hunt Showdown\\user\\profiles\\default\\attributes.xml'
    : '../../hunt-elo/src/assets/attributes.xml';

/**
 * The settings component
 * @returns {object} the settings component
 */
export function SettingsOverlay() {
    const [inputtedUsername, setInputtedUsername] = useState<string>('');

    const path = useSelector(pathSelector);

    const userId = useSelector(selectedUserIdSelector);
    const eloHistory = useSelector(eloHistorySelector(userId));

    useEffect(() => {
        (async () => {
            const userAttrs = await getAttrsByUserName(inputtedUsername, path);
            if (userAttrs) {
                setUserNameById(userAttrs.name, userAttrs.id);
                setSelectedUserId(userAttrs.id);
            }
        })();
    }, [inputtedUsername, path]);

    const setCurrentPath = useMemo(
        () => async () => {
            const path = (await getPath())?.[0];
            if (path) {
                setPath(path);
            }
        },
        []
    );

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
