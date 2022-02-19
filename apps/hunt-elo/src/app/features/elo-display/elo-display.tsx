import { GradientOrangeRed } from '@visx/gradient';
import { ParentSize } from '@visx/responsive';
import { Text } from '@visx/text';
import { useSelector } from 'react-redux';
import { eloSelector } from '../../_store/_selectors/elo-store/elo.selector';
import classes from './elo-display.module.scss';

/**
 * The elo display component
 * @returns {object} the elo display component
 */
export function EloDisplay() {
    const currentUserId = 0;

    const elo = useSelector(eloSelector(currentUserId));

    return (
        <div>
            {elo !== null ? (
                <div className={classes['elo']}>
                    <ParentSize>
                        {({ width }) => (
                            <svg width={width} className={classes['text-svg']}>
                                <GradientOrangeRed id="elo-gradient" />
                                <Text
                                    verticalAnchor="start"
                                    scaleToFit={true}
                                    width={width * 0.95}
                                    fill="url(#elo-gradient)"
                                >
                                    {elo}
                                </Text>
                            </svg>
                        )}
                    </ParentSize>
                </div>
            ) : (
                <div>no user found</div>
            )}
        </div>
    );
}

export default EloDisplay;