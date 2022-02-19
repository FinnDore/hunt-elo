import { path } from '@tauri-apps/api';
import { GradientOrangeRed } from '@visx/gradient';
import { ParentSize } from '@visx/responsive';
import { Text } from '@visx/text';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAttrsByUserId } from '../../_functions/get-attrs-by-id';
import { getPath } from '../../_functions/get-path';
import { logElo } from '../../_functions/log-elo';
import { appendEloById } from '../../_store/_actions/elo-store/append-elo.action';
import { setPath } from '../../_store/_actions/settings/set-path.action';
import { eloHistorySelector } from '../../_store/_selectors/elo-store/elo-history.selector';
import { eloSelector } from '../../_store/_selectors/elo-store/elo.selector';
import { pathSelector } from '../../_store/_selectors/settings/path.selector';
import { selectedUserIdSelector } from '../../_store/_selectors/settings/selected-user-id.selector';
import classes from './elo-display.module.scss';

/**
 * The elo display component
 * @returns {object} the elo display component
 */
export function EloDisplay() {
    const userId = useSelector(selectedUserIdSelector);
    const elo = useSelector(eloSelector(userId));
    const eloHistory = useSelector(eloHistorySelector(userId));
    const path = useSelector(pathSelector);

    const refreshElo = useCallback(async () => {
        if (!userId) {
            return;
        }

        const userAttrs = await getAttrsByUserId(userId, path);
        if (userAttrs) {
            appendEloById(userAttrs.elo, userAttrs.id);
        }
    }, [userId, path]);

    useEffect(() => {
        logElo(eloHistory ?? []);
    }, [eloHistory]);

    useEffect(() => {
        refreshElo();
    }, [refreshElo, userId]);

    useEffect(() => {
        window.addEventListener('focus', refreshElo);
        const timer = setInterval(refreshElo, 3000);
        return () => {
            clearInterval(timer);
            window.removeEventListener('focus', refreshElo);
        };
    }, [refreshElo]);

    return (
        <div className={classes['elo']}>
            {elo !== null ? (
                <ParentSize>
                    {({ width, height }) => (
                        <svg
                            width={width}
                            height={height}
                            className={classes['text-svg']}
                        >
                            <GradientOrangeRed id="elo-gradient" />
                            <Text
                                scaleToFit={true}
                                width={width}
                                fill="url(#elo-gradient)"
                                y={height * 0.75}
                            >
                                {elo}
                            </Text>
                        </svg>
                    )}
                </ParentSize>
            ) : (
                <div>no user found</div>
            )}
        </div>
    );
}

export default EloDisplay;
