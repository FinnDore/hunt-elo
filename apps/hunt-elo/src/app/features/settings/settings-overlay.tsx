import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { environment } from '../../../environments/environment.prod';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { getAttrsByUserName } from '../../_functions/get-attrs-by-name';
import { getPath } from '../../_functions/get-path';
import { setUserNameById } from '../../_store/_actions/elo-store/set-user-name.action';
import { setActiveOverlay } from '../../_store/_actions/settings/set-active-overlay.action';
import { setPath } from '../../_store/_actions/settings/set-path.action';
import { setSelectedUserId } from '../../_store/_actions/settings/set-selected-user-id.action';
import { eloHistorySelector } from '../../_store/_selectors/elo-store/elo-history.selector';
import { selectedUserNameSelector } from '../../_store/_selectors/elo-store/selected-user-name.selector copy';
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
    const [inputtedUsername, setInputtedUsername] = useState<string | null>(
        null
    );

    const path = useSelector(pathSelector);

    const userId = useSelector(selectedUserIdSelector);
    const userName = useSelector(selectedUserNameSelector);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            if (!inputtedUsername) {
                return;
            }
            const userAttrs = await getAttrsByUserName(inputtedUsername, path);
            if (userAttrs) {
                setUserNameById(userAttrs.name, userAttrs.id);
                setSelectedUserId(userAttrs.id);
                setErrorMessage('');
            } else {
                setErrorMessage('No user found');
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
        <div className={classes['container']}>
            <TextField
                className={classes['input']}
                id="outlined-basic"
                label="username"
                defaultValue={userName}
                onChange={e => {
                    setInputtedUsername(e.target.value ?? null);
                }}
                variant="outlined"
                error={!!errorMessage}
                helperText={errorMessage || 'case sensitive'}
            />

            <Button
                aria-label="Set a custom path"
                size="large"
                variant="outlined"
                onClick={setCurrentPath}
            >
                Set custom Path
            </Button>

            <Button
                aria-label="Exit settings"
                variant="contained"
                size="large"
                onClick={() => setActiveOverlay(ActiveOverlay.NONE)}
            >
                Close
            </Button>
        </div>
    );
}

export default SettingsOverlay;
