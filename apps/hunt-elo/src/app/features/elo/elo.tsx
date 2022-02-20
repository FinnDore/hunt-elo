import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { setActiveOverlay } from '../../_store/_actions/settings/set-active-overlay.action';
import { eloHistorySelector } from '../../_store/_selectors/elo-store/elo-history.selector';
import { selectedUserIdSelector } from '../../_store/_selectors/settings/selected-user-id.selector';
import { EloDisplay } from './elo-display/elo-display';
import SettingsIcon from '@mui/icons-material/Settings';
import classes from './elo.module.scss';
import EloChart from './elo-chart/elo-chart';

/**
 * The elo display component
 * @returns {object} the elo display component
 */
export function Elo() {
    const userId = useSelector(selectedUserIdSelector);

    return (
        <>
            <div className={classes['header']}>
                <IconButton
                    aria-label="settings"
                    size="large"
                    onClick={() => setActiveOverlay(ActiveOverlay.SETTINGS)}
                >
                    <SettingsIcon fontSize="inherit" />
                </IconButton>
            </div>

            <div className={classes['elo-display']}>
                <EloDisplay />
                <EloChart
                    {...{ width: 1000, height: 300, showControls: true }}
                />
            </div>

            {/* used to center the elo display vertically */}
            <div className={`${classes['header']} ${classes['hidden']}`}>
                <IconButton
                    aria-label="settings"
                    size="large"
                    onClick={() => setActiveOverlay(ActiveOverlay.SETTINGS)}
                >
                    <SettingsIcon fontSize="inherit" />
                </IconButton>
            </div>
        </>
    );
}
export default Elo;
